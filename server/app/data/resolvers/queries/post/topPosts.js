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
    } else if (startDateRange) {
      // Handle single start date
      searchArgs.pointTimestamp = {
        $gte: new Date(startDateRange),
      };
    } else if (endDateRange) {
      // Handle single end date
      searchArgs.pointTimestamp = {
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
        // If userId filter already exists, we need to combine them with $and
        if (searchArgs.userId) {
          const existingUserIdFilter = searchArgs.userId;
          searchArgs.$and = [
            { userId: existingUserIdFilter },
            { userId: { $in: currentUser._followingId } } // eslint-disable-line no-underscore-dangle
          ];
          delete searchArgs.userId;
        } else {
          searchArgs.userId = {
            $in: currentUser._followingId, // eslint-disable-line no-underscore-dangle
          };
        }
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
      // If friendsOnly filter is also applied, we need to combine them
      if (friendsOnly && context.user && context.user._id) {
        const currentUser = await UserModel.findById(context.user._id);
        if (currentUser && currentUser._followingId && currentUser._followingId.length > 0) {
          // Check if the requested userId is in the user's following list
          if (!currentUser._followingId.includes(userId)) {
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
      }
      searchArgs.userId = userId;
    }

    // Handle approved filter - can be combined with other filters
    if (approved !== undefined) {
      searchArgs.approved = approved;
    }

    let trendingPosts;
    let totalPosts;

    if (interactions) {
      // When interactions is true, use aggregation to get posts with interaction counts
      const aggregationPipeline = [
        { $match: searchArgs },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'postId',
            as: 'comments'
          }
        },
        {
          $lookup: {
            from: 'votes',
            localField: '_id',
            foreignField: 'postId',
            as: 'votes'
          }
        },
        {
          $addFields: {
            commentCount: { $size: '$comments' },
            voteCount: { $size: '$votes' },
            totalInteractions: {
              $add: [
                { $size: '$comments' },
                { $size: '$votes' }
              ]
            }
          }
        },
        {
          $sort: {
            totalInteractions: -1,
            commentCount: -1,
            voteCount: -1,
            dayPoints: -1,
            pointTimestamp: -1,
            created: -1
          }
        },
        {
          $skip: offset
        },
        {
          $limit: limit
        }
      ];

      // Get total count for pagination
      const countPipeline = [
        { $match: searchArgs },
        {
          $count: 'total'
        }
      ];

      const [postsResult, countResult] = await Promise.all([
        PostModel.aggregate(aggregationPipeline),
        PostModel.aggregate(countPipeline)
      ]);

      trendingPosts = postsResult;
      totalPosts = countResult.length > 0 ? countResult[0].total : 0;
    } else {
      // Original logic for when interactions is false
      totalPosts = await PostModel.find(searchArgs).count();

      // Build sort criteria
      let sortCriteria = {
        created: "desc", // Secondary sort by creation date for chronological ordering
      };

      console.log('Search query details:', {
        searchKey: searchKey,
        searchKeyTrimmed: searchKey ? searchKey.trim() : null,
        searchArgs,
        offset,
        limit,
        totalPosts,
        sortCriteria,
        filtersApplied: {
          friendsOnly,
          interactions,
          dateRange: !!(startDateRange || endDateRange),
          search: !!(searchKey && searchKey.trim())
        }
      });

      trendingPosts = await PostModel.find(searchArgs)
        .sort(sortCriteria)
        .skip(offset)
        .limit(limit);
    }

    // Populate creator information
    const postsWithCreator = await Promise.all(
      trendingPosts.map(async (post) => {
        const creator = await UserModel.findById(post.userId);
        const postObj = post.toObject ? post.toObject() : post; // Handle both mongoose documents and aggregation results
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
