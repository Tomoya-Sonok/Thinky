// Import Packages
import React from "react"
import axios from "axios"
import update from "immutability-helper"

// Import Styles
import chatStyles from "../styles/ChatPage.module.scss"
import Button from "@material-ui/core/Button"
import SendIcon from "@material-ui/icons/Send"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import ThumbUpIcon from "@material-ui/icons/ThumbUp"

// Import Components
import ChatHeader from "./ChatHeader"
import Answer from "./Answer"
import Like from "./Like"

export default class ChatPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      whyId: 0,
      whyContent: this.props.location.state.why,
      answer: "",
      checkShare: this.props.location.state.share,
      answers: [],
      errorText: "",
      likeStatus: "",
      likeCount: 0,
      like: false,
    }

    // binding "this"
    this.sendAnswer = this.sendAnswer.bind(this)
    this.createAnswer = this.createAnswer.bind(this)
    this.getAnswers = this.getAnswers.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
    this.getLikesData = this.getLikesData.bind(this)
    this.handleLike = this.handleLike.bind(this)
  }

  componentDidMount() {
    const id = this.props.location.state.whyId
    axios
      .get(`http://localhost:3001/whies/${id}`)
      .then((response) => {
        console.log(response.data)
        this.setState({ whyId: response.data.id })
        this.setState({ whyContent: response.data.question })
        this.setState({ checkShare: response.data.share })
        this.setState({ likeCount: response.data.likes_count })
        this.getLikesData(response.data.id, response.data.user_id)
        this.getAnswers(response.data.id)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // ログアウト
  // handleLogoutClick(props) {
  //   console.log("logout btn pushed")
  //   axios
  //     .delete("http://localhost:3001/logout", { withCredentials: true })
  //     .then((response) => {
  //       console.log(response)
  //       this.props.handleLogout()
  //       this.props.history.push("/signin")
  //     })
  //     .catch((error) => {
  //       console.log("logout error", error)
  //     })
  // }

  // いいねボタン押したとき
  handleLike() {
    const userId = this.props.user.id
    const whyId = this.state.whyId

    // likeのstateがtrue(押されている)か、false(押されていない)で条件分岐
    return this.state.like
      ? axios
          .delete(
            `http://localhost:3001/whies/${whyId}/like/${whyId}`,
            { data: { user_id: userId } },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res)
            this.setState({ like: false })
            this.setState({ likeCount: this.state.likeCount - 1 })
          })
          .catch((err) => {
            console.log(err)
          })
      : axios
          .post(
            `http://localhost:3001/whies/${whyId}/like/${whyId}`,
            { user_id: userId },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res)
            this.setState({ like: true })
            this.setState({ likeCount: this.state.likeCount + 1 })
          })
          .catch((err) => {
            console.log(err)
          })
  }

  // ユーザーがいいねしたかどうか確認する
  getLikesData(whyId, userId) {
    axios
      .get(
        `http://localhost:3001/whies/${whyId}/status/${whyId}`,
        { params: { user_id: userId } },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.status === "already liked") {
          console.log("success", res.data)
          this.setState({ likeStatus: res.data.status })
          this.setState({ like: true })
        } else {
          console.log("success", res.data)
          this.setState({ likeStatus: res.data.status })
          this.setState({ like: false })
        }
      })
      .catch((err) => {
        console.log("error", err)
      })
  }

  getAnswers(id) {
    if (this.props.location.state.pv) {
      axios
        .get(`http://localhost:3001/answers/index_pv`, {
          params: { id },
        })
        .then((response) => {
          console.log(response.data)
          this.setState({ answers: response.data })
        })
        .catch((err) => {
          console.error(err)
        })
    } else if (this.props.location.state.pb) {
      axios
        .get(`http://localhost:3001/answers/index_pb`, {
          params: { id },
        })
        .then((response) => {
          console.log(response.data)
          this.setState({ answers: response.data })
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  sendAnswer(e) {
    e.preventDefault()
    const { answer, whyId } = this.state
    this.createAnswer(answer, whyId)
    this.setState({ answer: "" })
    e.target.elements.textarea.value = ""
  }

  createAnswer = (answer, whyId) => {
    if (this.props.location.state.pv) {
      console.log(answer)
      axios
        .post("http://localhost:3001/answers/post_pv", {
          answer,
          id: whyId,
          user_id: this.props.user.id,
        })
        .then((response) => {
          console.log(response.data)
          console.log(response.data.id)
          axios
            .get(`http://localhost:3001/answers/find_pv/${response.data.id}`, {
              id: response.data.id,
            })
            .then((response) => {
              console.log(response)
              const newAnswers = update(this.state.answers, {
                $push: [response.data],
              })
              this.setState({ answers: newAnswers })
            })
            .catch((err) => {
              console.error(err)
              this.setState({
                errorText: "「Answer」を入力してください",
              })
            })
        })
        .catch((err) => {
          console.error(err)
        })
    } else if (this.props.location.state.pb) {
      console.log(answer)
      axios
        .post("http://localhost:3001/answers/post_pb", {
          answer,
          id: whyId,
          user_id: this.props.user.id,
        })
        .then((response) => {
          console.log(response.data)
          axios
            .get(`http://localhost:3001/answers/find_pb/${response.data.id}`, {
              id: response.data.id,
            })
            .then((response) => {
              console.log(response.data)
              const newAnswers = update(this.state.answers, {
                $push: [response.data],
              })
              this.setState({ answers: newAnswers })
            })
            .catch((err) => {
              console.error(err)
              this.setState({
                errorText: "「Answer」を入力してください",
              })
            })
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  // エラーハンドリング
  handleValidation(e) {
    const value = e.target.value
    value
      ? this.setState({ errorText: "" })
      : this.setState({ errorText: "「Answer」を入力してください" })
  }

  render() {
    return (
      <>
        <ChatHeader
          loggedInStatus={this.state.loggedInStatus}
          user={this.props.user}
          whyId={this.state.whyId}
          whyContent={this.state.whyContent}
          pv={this.props.location.state.pv}
          checkShare={this.state.checkShare}
          handleLogoutClick={this.handleLogoutClick}
          handleLogout={this.props.handleLogout}
          why={this.state.why}
          handleLike={this.handleLike}
          likeCount={this.state.likeCount}
          like={this.state.like}
        />
        <div className={chatStyles.chatBox}>
          <div className={chatStyles.communication}>
            {this.state.answers.map((answer) => {
              return (
                <Answer
                  answer={answer}
                  pv={this.props.location.state.pv && true}
                  userId={this.props.user.id}
                  key={answer.id}
                />
              )
            })}
          </div>
          <div className={chatStyles.messageBox}>
            <div className={chatStyles.errMessage}>{this.state.errorText}</div>
            <div className={chatStyles.formContainer}>
              <div className={chatStyles.formBox}>
                <form noValidate autoComplete="off" onSubmit={this.sendAnswer}>
                  <TextareaAutosize
                    rowsMax={1}
                    aria-label="maximum height"
                    placeholder="Answerを入力してください。"
                    className={chatStyles.form}
                    name="textarea"
                    value={this.state.answer}
                    onChange={(e) => {
                      this.setState({ answer: e.target.value })
                      this.handleValidation(e)
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    style={this.useStyles.button}
                    endIcon={<SendIcon />}
                    type="submit"
                  >
                    Send
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  useStyles = {
    button: {
      position: "absolute",
      top: "160%",
      right: "8%",
      backgroundColor: "#3F51B5",
    },
    likeBtn: {
      float: "right",
      alignItems: "center",
      display: "block",
      backgroundColor: "#303030",
    },
    like: {
      filter: `drop-shadow(0 10px 25px 0 rgba(0, 0, 0, .5))`,
      zIndex: 1,
      color: "red",
      "&:hover": {
        cursor: "pointer",
      },
    },
    unlike: {
      zIndex: 1,
      color: "white",
      "&:hover": {
        cursor: "pointer",
      },
    },
    count: {
      margin: "8px",
      display: "inline-block",
      // marginBottom: theme
    },
    container: {
      alignItems: "center",
      width: "70px",
      float: "right",
      position: "relative",
      top: "-100px",
    },
  }
}
