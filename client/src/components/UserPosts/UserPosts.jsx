import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Dialog } from '@material-ui/core';
import PostList from '../Post/PostsList';
import { GET_TOP_POSTS } from '../../graphql/query';
import ErrorBoundary from '../ErrorBoundary';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SubmitPost from '../SubmitPost/SubmitPost';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  list: {
    width: '100%',
    marginBottom: 10,
  },
  emptyState: {
    textAlign: 'center',
    padding: theme.spacing(4),
  },
}))

export default function UserPosts({ userId }) {
  const classes = useStyles()
  const limit = 15
  const [open, setOpen] = useState(false)
  const history = useHistory()
  const loggedIn = useSelector((state) => !!state.user.data._id)

  const variables = {
    limit,
    offset: 0,
    searchKey: '',
    startDateRange: '',
    endDateRange: '',
    friendsOnly: false,
    interactions: false,
    userId, // Filter posts by specific user
  }

  const { loading, data, fetchMore } = useQuery(GET_TOP_POSTS, {
    variables,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleCreateQuote = () => {
    if (loggedIn) {
      setOpen(true)
    } else {
      history.push('/auth/request-access')
    }
  }

  return (
    <ErrorBoundary>
      <div className={classes.root}>
        {/* {!loading && data && (!data.posts || data.posts.entities.length === 0) && ( */}
          <div className={classes.header}>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: '#2ecc71', color: 'white' }}
              onClick={handleCreateQuote}
            >
              Create Quote
            </Button>
          </div>
        {/* )} */}
        <div className={classes.list}>
          {!loading && data && (!data.posts || data.posts.entities.length === 0) ? (
            <div className={classes.emptyState}>
              <Typography variant="h6" color="textSecondary">
                No posts found for this user.
              </Typography>
            </div>
          ) : (
            <PostList
              data={data}
              loading={loading}
              limit={limit}
              fetchMore={fetchMore}
              variables={variables}
              cols={1}
            />
          )}
        </div>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullScreen={false}
        maxWidth="sm"
        fullWidth
      >
        <SubmitPost setOpen={setOpen} />
      </Dialog>
    </ErrorBoundary>
  )
}

UserPosts.propTypes = {
  userId: PropTypes.string.isRequired,
} 