import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import GridContainer from "components/Grid/GridContainer.js";
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import {useQuery} from '@apollo/react-hooks';
import CircularProgress from "@material-ui/core/CircularProgress";
import { USER_INVITE_REQUESTS, UPDATE_USER_INVITE_STATUS } from 'graphql/query';
import { Mutation } from '@apollo/react-components';


function createData(ID, email, status) {
  return { ID, email, status };
}

const rows = [
  createData(1, "jonathankolman@gmail.com", "NEW"),
  createData(2, 'kendricklamar@gmail.com', 'NEW'),
];

function Headers() {
  const useStyles = makeStyles({
    h2: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '22px',
      /* identical to box height */

      letterSpacing: '0.2px',

      color: '#E91E63'
    },
    divider: {
        marginBottom: 10,
    },
    littleTopBar: {
      width: '48%',
      marginRight: 10,
      paddingLeft:10
    },
  });
  const classes = useStyles();
    return (
      <GridContainer>
        <Paper className={classes.littleTopBar}  elevation={3}> 
                <h2 className={classes.h2}>User Invitation Requests</h2>
                <Divider className={classes.divider} />
        </Paper>
        <Paper className={classes.littleTopBar} elevation={3}> 
            <h2 className={classes.h2}>User Invite Statistics</h2>
            <Divider className={classes.divider} />
        </Paper>
      </GridContainer>
    )
}

function InviteTable(props) {
  const {data, handleAccept} = props

  const useStyles = makeStyles({

    tableContainer: {
      width: '48%',
      marginTop: 20
    },
    tableHead: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '300',
      fontSize: '17px',
      lineHeight: '20px',
      /* identical to box height */
      color: '#9C27B0'
    }
  })
  const classes = useStyles();

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table aria-label="Invite Table">
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.tableHead}>ID</TableCell>
            <TableCell className={classes.tableHead} align="right">Email</TableCell>
            <TableCell className={classes.tableHead} align="right">Status</TableCell>
            <TableCell className={classes.tableHead} align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {data.userInviteRequests.map(row => (
            <TableRow key={row.email}>
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">
                {row.status === 'ACCEPT' || row.status === 'APPROVED' ? <div></div>: 
                  <Mutation mutation={UPDATE_USER_INVITE_STATUS}>
                  {(updateInviteStatus, { data }) => (
                      <Button onClick={(e) => updateInviteStatus({variables:{action: 'ACCEPT', user_invite_id: row._id}}) }>Accept</Button>

                    )}
                  </Mutation>
                }
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function ManageInvites(props) {
  const {data} = useQuery(USER_INVITE_REQUESTS);
  console.log('DATA', data)
    //const {contents} = data
    /* const handleAccept = (user) => {
      switch(user.status) {
        case 'RESEND':
          break
        case 'NEW':
          const update = useMutation(UPDATE_USER_INVITE_STATUS)
          console.log(update)
      } */

    if(data) {
      return (
          <GridContainer> 
            <Headers />
            <InviteTable 
              data={data}  
            />
          </GridContainer>
      )
    }
    else {
      return (
        <GridContainer>
          loading
        </GridContainer>
      )
    }
    

}


