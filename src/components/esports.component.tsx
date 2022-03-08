import { Component, ChangeEvent } from "react";

import EsportsDataService from "../services/esports.service";
import IEsportsData from "../types/esports.type";

type Props = {
  esports: IEsportsData;
  refreshList: Function;
};

type State = {
  currentEsports: IEsportsData;
  message: string;
};

export default class Esports extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeEsportsURL = this.onChangeEsportsURL.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateEsports = this.updateEsports.bind(this);
    this.deleteEsports = this.deleteEsports.bind(this);

    this.state = {
      currentEsports: {
        id: null,
        title: "",
        description: "",
        esportsURL: "",
        published: false,
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { esports } = nextProps;
    if (prevState.currentEsports.id !== esports.id) {
      return {
        currentEsports: esports,
        message: "",
      };
    }

    return prevState.currentEsports;
  }

  componentDidMount() {
    this.setState({
      currentEsports: this.props.esports,
    });
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;

    this.setState(function (prevState: State) {
      return {
        currentEsports: {
          ...prevState.currentEsports,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentEsports: {
        ...prevState.currentEsports,
        description: description,
      },
    }));
  }

  onChangeEsportsURL(e: ChangeEvent<HTMLInputElement>) {
    const esportsURL = e.target.value;

    this.setState((prevState) => ({
      currentEsports: {
        ...prevState.currentEsports,
        esportsURL: esportsURL,
      },
    }));
  }

  updatePublished(status: boolean) {
    if (this.state.currentEsports.id) {
      EsportsDataService.update(this.state.currentEsports.id, {
        published: status,
      })
        .then(() => {
          this.setState((prevState) => ({
            currentEsports: {
              ...prevState.currentEsports,
              published: status,
            },
            message: "The status was updated successfully!",
          }));
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }

  updateEsports() {
    if (this.state.currentEsports.id) {
      const data = {
        title: this.state.currentEsports.title,
        description: this.state.currentEsports.description,
        esportsURL: this.state.currentEsports.esportsURL,
      };

      EsportsDataService.update(this.state.currentEsports.id, data)
        .then(() => {
          this.setState({
            message: "The Game was updated successfully!",
          });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }

  deleteEsports() {
    if (this.state.currentEsports.id) {
      EsportsDataService.delete(this.state.currentEsports.id)
        .then(() => {
          this.props.refreshList();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }

  render() {
    const { currentEsports } = this.state;

    return (
      <div>
        <h4 className="text-info">Edit Esports</h4>
        {currentEsports ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentEsports.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentEsports.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="esportsURL">Game Website</label>
                <input
                  type="text"
                  className="form-control"
                  id="esportsURL"
                  value={currentEsports.esportsURL}
                  onChange={this.onChangeEsportsURL}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentEsports.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentEsports.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Add this Esport
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteEsports}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateEsports}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Esport</p>
          </div>
        )}
      </div>
    );
  }
}
