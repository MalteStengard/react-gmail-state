import { useState } from "react";
import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";

function App() {
  // Use initialEmails for state
  console.log(initialEmails)

  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);

  const toggleStar = (id) => {
    const updatedEmails = emails.map((email) => {
      if (email.id === id) {
        return { ...email, starred: !email.starred };
      }
      return email;
    });
    setEmails(updatedEmails);
  };

  const toggleRead = (id) => {
    const updatedEmails = emails.map((email) => {
      if (email.id === id) {
        return { ...email, read: !email.read };
      }
      return email;
    });
    setEmails(updatedEmails);
  };

  const filteredEmails = hideRead
    ? emails.filter((email) => !email.read)
    : emails;


  const countUnread = emails.filter((email) => !email.read).length;
  const countStarrred = emails.filter((email) => email.starred).length;

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">{countUnread}</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">{countStarrred}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => {
                setHideRead(!hideRead);
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {filteredEmails.map((email) => (
          <li
            key={email.id}
            className={`email ${email.read ? "read" : "unread"}`}
          >
            <div className="select">
              <input
                className="select-checkbox"
                type="checkbox"
                checked={email.read}
                onChange={() => {
                  toggleRead(email.id);
                }}
              />
            </div>
            <div className="star">
              <input
                className="star-checkbox"
                type="checkbox"
                checked={email.starred}
                onChange={() => toggleStar(email.id)}
              />
            </div>
            <div className="sender">{email.sender}</div>
            <div className="title">{email.title}</div>
          </li>
        ))}
      </main>
    </div>
  );
}

export default App;
