import GuestFooter from 'components/GuestFooter';
export default function InfoSections() {
  return (
    <>
    <div style={{ padding: '2rem 1rem', marginTop: '2rem', borderRadius: 8, maxWidth: "80%", marginLeft: 'auto', marginRight: 'auto' }}>
      <section style={{ marginBottom: '2rem' }}>
        <h2>Mission</h2>
        <blockquote style={{ fontStyle: 'italic', margin: '0 0 1rem 0' }}>
          "Quote.Vote aspires to be a commons;<br/>
          a catalyst for consensus, not a contest for influence."
        </blockquote>
        <p>Quote.Vote is a platform for genuine, in-depth discussions.<br/>
        It exists to protect and nurture civic discourse by creating a digital space where quoting and voting can flourish—without manipulation, algorithms, or advertising.</p>
        <p>In today's social media environment, quick posts, outrage cycles, and engagement metrics dominate our attention.<br/>
        This place offers a structural alternative, one that values writing as a tool for reflection and conversation as a form of care.</p>
        <p>This is not a startup, but rather a public utility for collective thought. It is designed to slow users down, not speed them up. It invites people to read carefully, reflect together, and vote deliberately.</p>
      </section>
      <section style={{ marginBottom: '2rem' }}>
        <h2>Deliberately Text-Only</h2>
        <blockquote style={{ fontStyle: 'italic', margin: '0 0 1rem 0' }}>
          "Every aspect of the platform is intentional.<br/>
          Every constraint is a choice rooted in values."
        </blockquote>
        <p>No videos. No images. No audio.</p>
        <p>Quotes are blocks of text that open public chatrooms called Quote Rooms—structured conversations anchored in clarity, and precise feedback.</p>
      </section>
      <section style={{ marginBottom: '2rem' }}>
        <h2>Votes, Not Likes</h2>
        <p>At any time, a quote can be put to a vote that an author can activate after submitting. Visitors choose to approve or disagree with ideas. No likes. A quote vote can not be undone after the toggle is clicked.</p>
      </section>
      <section style={{ marginBottom: '2rem' }}>
        <h2>Invite-Only Growth</h2>
        <p>Posting and quoting are gated through a vouching system. Each contributor takes responsibility for who they invite. The growth rate is controlled to protect community culture and avoid the pitfalls of viral scale.</p>
        <blockquote style={{ fontStyle: 'italic', margin: '0 0 1rem 0' }}>
          "Quoting and voting are available to all, but the power to publish is earned through trust and intent."
        </blockquote>
      </section>
      <section style={{ marginBottom: '2rem' }}>
        <h2>Civic Moderation by Reputation</h2>
        <p>Moderation isn't algorithmic or top-down. It's shared. Each use will be a crucial part of the moderation system, and when invites are shared with others, the referred user's behavior will impact reputation weighting. A user's invite tree grows to define the type of user they are following code of conducts and terms of service; downstream behavior reflects upstream.</p>
        <p>Misconduct is a community responsibility. Every user is a moderator. Officially appointed moderators are compensated by the non-for profit entity that exchanges their time for monetary reward. All community members are facilitators tasked with protecting clarity about what is tolerated and what is not.</p>
      </section>
      <section>
        <h2>Public Direct Messages</h2>
        <p>There are no DMs. All user interactions occur in public Quote Rooms. So 1:1 messages take place interview-style, in the open, where others can vote on what was said. This reinforces a culture of transparency and discourages collaboration.</p>
      </section>
    </div>
    <GuestFooter isRequestAccess />
    </>
  );
} 