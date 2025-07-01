import PostModel from "../../models/PostModel";
import UserModel from "../../models/UserModel";


export const topPosts = (pubsub) => {
  return async (_, args, context) => {
    const {
      limit,
      offset,
      searchKey,
      startDateRange,
      endDateRange,
      friendsOnly,
      groupId,
      userId,
      approved, 
      interactions,
    } = args;

    // Build search arguments
    const searchArgs = {};

    // Handle text search - can be combined with other filters
    if (searchKey && searchKey.trim()) {
      searchArgs.$or = [
        { title: { $regex: searchKey.trim(), $options: 'i' } },
        { text: { $regex: searchKey.trim(), $options: 'i' } }
      ];
    }

    // Handle date range filter - can be combined with search and friendsOnly
    if (startDateRange && endDateRange) {
      searchArgs.pointTimestamp = {
        $gte: new Date(startDateRange),
        $lte: new Date(endDateRange),
      };
    }

    // Handle friendsOnly filter - can be combined with search and date range
    if (friendsOnly) {
      if (!context.user || !context.user._id) {
        // eslint-disable-line no-underscore-dangle
        // If friendsOnly is requested but no user context, return empty results
        return {
          entities: [],
          pagination: {
            total_count: 0,
            limit,
            offset,
          },
        };
      }


      // Get the current user's following list
      const currentUser = await UserModel.findById(
        context.user._id // eslint-disable-line no-underscore-dangle
      );
      if (
        currentUser &&
        currentUser._followingId && // eslint-disable-line no-underscore-dangle
        currentUser._followingId.length > 0 // eslint-disable-line no-underscore-dangle
      ) {
        searchArgs.userId = {
          $in: currentUser._followingId, // eslint-disable-line no-underscore-dangle
        };
      } else {
        // If user has no following, return empty results
        return {
          entities: [],
          pagination: {
            total_count: 0,
            limit,
            offset,
          },
        };
      }
    }

    // Handle groupId filter - can be combined with other filters
    if (groupId) {
      searchArgs.groupId = groupId;
    }

    // Handle userId filter - can be combined with other filters
    if (userId) {
      searchArgs.userId = userId;
    }

    // Handle approved filter - can be combined with other filters
    if (approved !== undefined) {
      searchArgs.approved = approved;
    }

    const totalPosts = await PostModel.find(searchArgs).count();

    // Build sort criteria
    const sortCriteria = {
      createdAt: "desc", // Secondary sort by creation date for chronological ordering
    };

    if(interactions) {
      sortCriteria.dayPoints = "desc";
      sortCriteria.pointTimestamp = "desc";
    }

    console.log('Search query details:', {
      searchKey: searchKey,
      searchKeyTrimmed: searchKey ? searchKey.trim() : null,
      searchArgs,
      offset,
      limit,
      totalPosts,
      sortCriteria
    });

    const trendingPosts = await PostModel.find(searchArgs)
      .sort(sortCriteria)
      .skip(offset)
      .limit(limit);

    console.log('Trending posts:', trendingPosts);

    // Populate creator information
    const postsWithCreator = await Promise.all(
      trendingPosts.map(async (post) => {
        const creator = await UserModel.findById(post.userId);
        const postObj = post.toObject();
        return {
          ...postObj,
          creator: creator
            ? {
                _id: creator._id, // eslint-disable-line no-underscore-dangle
                name: creator.name,
                username: creator.username,
                avatar: creator.avatar,
              }
            : null,
          votedBy: Array.isArray(postObj.votedBy)
            ? postObj.votedBy.map((v) => (v.userId ? v.userId.toString() : v))
            : [],
        };
      })
    );

    return {
      entities: postsWithCreator,
      pagination: {
        total_count: totalPosts,
        limit,
        offset,
      },
    };
  };
};
