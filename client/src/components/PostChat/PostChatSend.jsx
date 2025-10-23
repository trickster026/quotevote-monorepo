import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { CHAT_SUBMITTING } from 'store/chat'
import { useMutation } from '@apollo/react-hooks'
import { Grid, InputBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { SEND_MESSAGE } from '../../graphql/mutations'
import { GET_ROOM_MESSAGES } from '../../graphql/query'
import useGuestGuard from '../../utils/useGuestGuard'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: 10,
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  chat: {
    fontWeight: 600,
    fontSize: 14,
    color: '#666',
  },
  input: {
    borderRadius: 6,
    background: '#f5f7fa',
    border: '1px solid #e1e8ed',
    minHeight: 45,
    maxHeight: 75, 
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    width: '80%',
    [theme.breakpoints.up('md')]: {
      width: '85%',
    },
    '&:focus-within': {
      background: '#ffffff',
      border: '1px solid #1976d2',
      boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
    },
    '& .MuiInputBase-input': {
      resize: 'none',
      '&::placeholder': {
        opacity: 0.7,
      },
    },
  },
  inputEmpty: {
    minHeight: 65,
  },
  send: {
    float: 'right',
  },
}))

function PostChatSend(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const commentInputRef = useRef(null)
  const { messageRoomId, title } = props
  const type = 'POST'
  const [text, setText] = useState('')
  const [error, setError] = useState(null) // eslint-disable-line no-unused-vars
  const user = useSelector((state) => state.user.data)
  const ensureAuth = useGuestGuard()
  const [createMessage] = useMutation(SEND_MESSAGE, {
    onError: (err) => {
      setError(err)
      dispatch(CHAT_SUBMITTING(false))
    },
    onCompleted: () => {
      dispatch(CHAT_SUBMITTING(false))
    },
    refetchQueries: [{
      query: GET_ROOM_MESSAGES,
      variables: {
        messageRoomId,
      },
    }],
  })

  const handleSubmit = async () => {
    if (!ensureAuth()) return
    if (!text.trim()) return // Don't submit empty messages
    
    dispatch(CHAT_SUBMITTING(true))

    const message = {
      title,
      type,
      messageRoomId,
      text: text.trim(),
    }

    const dateSubmitted = new Date()
    await createMessage({
      variables: { message },
      optimisticResponse: {
        __typename: 'Mutation',
        createMessage: {
          __typename: 'Message',
          _id: dateSubmitted, // dummy
          messageRoomId,
          userName: user.name,
          userId: user._id,
          title,
          text: text.trim(),
          type,
          created: dateSubmitted,
          user: {
            __typename: 'User',
            name: user.name,
            username: user.username,
            avatar: user.avatar,
          },
        },
      },
      // eslint-disable-next-line no-shadow
      update: (proxy, { data: { createMessage } }) => {
        // Read the data from our cache for this query.
        const data = proxy.readQuery({ query: GET_ROOM_MESSAGES, variables: { messageRoomId } })
        if (data) {
          // Write our data back to the cache with the new message in it
          proxy.writeQuery({
            query: GET_ROOM_MESSAGES,
            variables: { messageRoomId },
            data: {
              ...data,
              messages: [...data.messages, createMessage],
            },
          })
        }
      },
    })
    
    // Clear the text input after successful submission
    setText('')
  }

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Hidden only={['xs']}>
        <Grid item sm={2}>
          <Typography className={classes.chat}>Chat</Typography>
        </Grid>
      </Hidden>
      <Grid item sm={10} xs={12}>
        <Paper elevation={0}>
          <InputBase
            multiline
            maxRows={4}
            inputRef={commentInputRef}
            placeholder="type a message..."
            className={`${classes.input} ${!text.trim() ? classes.inputEmpty : ''}`}
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                handleSubmit()
              }
            }}
          />
          <IconButton
            className={classes.send}
            onClick={() => {
              handleSubmit()
            }}
          >
            <img src="/assets/SendIcon.svg" alt="send"></img>
          </IconButton>
        </Paper>
      </Grid>
    </Grid>
  )
}

PostChatSend.propTypes = {
  messageRoomId: PropTypes.string,
  title: PropTypes.string,
}

export default PostChatSend
