export default `
# Subscription
type Subscription {    
    # Create message subscription
    message(messageRoomId: String!): Message   
    
    # Create notification subscription
    notification(userId: String!): Notification        
}
`;
