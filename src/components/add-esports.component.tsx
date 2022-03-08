import { Component, ChangeEvent } from "react";
import EsportsDataService from "../services/esports.service";
import IEsportsData from "../types/esports.type";

type Props = {};

type State = IEsportsData & {
  submitted: boolean;
};

export default class AddEsports extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeEsportsURL = this.onChangeEsportsURL.bind(this);
    this.saveEsports = this.saveEsports.bind(this);
    this.newEsports = this.newEsports.bind(this);

    this.state = {
      title: "",
      description: "",
      esportsURL: "",

      published: false,

      submitted: false,
    };
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeEsportsURL(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      esportsURL: e.target.value,
    });
  }

  saveEsports() {
    let data = {
      title: this.state.title,
      description: this.state.description,
      esportsURL: this.state.esportsURL,
      published: false,
    };

    EsportsDataService.create(data)
      .then(() => {
        console.log("Created new item successfully!");
        this.setState({
          submitted: true,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newEsports() {
    this.setState({
      title: "",
      description: "",
      esportsURL: "",

      published: false,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted the Esports Details successfully!</h4>
            <button className="btn btn-success" onClick={this.newEsports}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title of the Game</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description of the game</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="esports url">Game Website</label>
              <input
                type="text"
                className="form-control"
                id="esportsurl"
                required
                value={this.state.esportsURL}
                onChange={this.onChangeEsportsURL}
                name="description"
              />
            </div>

            <button onClick={this.saveEsports} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
