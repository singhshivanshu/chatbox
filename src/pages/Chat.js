import React, { Component, Children } from "react";
import { auth, db } from "../firebase/firebase";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: "",
      readError: null,
      writeError: null,
      loadingChats: false,
      file: [],
      url: '',
    };
    this.myRef = React.createRef();
  }
  componentDidMount() {
    this.setState({ readError: null, loadingChats: true });
    const chatArea = this.myRef.current;
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort(function (a, b) {
          return a.timestamp - b.timestamp;
        });
        this.setState({ chats });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingChats: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }

    db.ref("chats")

  }
  

  handleClick = () => {
    document.getElementById("uploader").click()
  }

  onInputChange = (event) => {
    this.setState({file: event.target.files[0]})
  }

  pushFileIntoDb = () => {
    let storageRef = db.ref("chats/" + this.state.file.name)
    storageRef.put(this.state.file)
  
  }

  handleChange = (event) => {
    this.setState({
      content: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    try {
      await db.ref("chats").push({
        file :this.state.file,
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
      });
      await db.ref("chats/" + this.state.file.name).put(this.state.file)
      this.setState({ content: "" });
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  };

  formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  }





  render() {
    return (
      <div>
        <div className="chat-area" ref={this.myRef}>
          {/* loading indicator */}
          {this.state.loadingChats ? (
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            ""
          )}
          {/* chat area */}
          {this.state.chats.map((chat) => {
            return (
              <p
                key={chat.timestamp}
                className={
                  "chat-bubble " +
                  (this.state.user.uid === chat.uid ? "current-user" : "")
                }
              >
                {chat.content}
                <br />
                <span className="chat-time float-right">
                  {this.formatTime(chat.timestamp)}
                </span>
              </p>
            );
          })}
        </div>

        <form onSubmit={this.handleSubmit} className="mx-3">
          <textarea
            className="form-control"
            name="content"
            onChange={this.handleChange}
            value={this.state.content}
          ></textarea>
          <br />

          {this.state.error ? (
            <p className="text-danger">{this.state.error}</p>
          ) : null}
          <Fab size="small" color="primary" aria-label="add" onClick={this.handleClick}>
            <AddIcon />
          </Fab>
          <input id="uploader" type="file" onChange={this.onInputChange}/>
          <Button type="submit" variant="contained" color="secondary">
            Send
          </Button>
        </form>
        <div className="py-5 mx-3">
          Login in as:{" "}
          <strong className="text-info">{this.state.user.email}</strong>
        </div>
      </div>
    );
  }
}
export default Chat;
