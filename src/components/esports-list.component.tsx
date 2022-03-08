import { Component } from "react";
import EsportsDataService from "../services/esports.service";
import Esports from "./esports.component";
import IEsportsData from "../types/esports.type";

type Props = {};

type State = {
  esports: Array<IEsportsData>;
  currentEsports: IEsportsData | null;
  currentIndex: number;
};

export default class EsportsList extends Component<Props, State> {
  unsubscribe: () => void;

  constructor(props: Props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEsports = this.setActiveEsports.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      esports: [],
      currentEsports: null,
      currentIndex: -1,
    };

    this.unsubscribe = () => {};
  }

  componentDidMount() {
    this.unsubscribe = EsportsDataService.getAll()
      .orderBy("title", "asc")
      .onSnapshot(this.onDataChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onDataChange(items: any) {
    let esports = new Array<IEsportsData>();

    items.forEach((item: any) => {
      let id = item.id;
      let data = item.data();
      esports.push({
        id: id,
        title: data.title,
        description: data.description,
        esportsURL: data.esportsURL,
        published: data.published,
      });
    });

    this.setState({
      esports: esports,
    });
  }

  refreshList() {
    this.setState({
      currentEsports: null,
      currentIndex: -1,
    });
  }

  setActiveEsports(esports: IEsportsData, index: number) {
    this.setState({
      currentEsports: esports,
      currentIndex: index,
    });
  }

  render() {
    const { esports, currentEsports, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4 className="text-pink mb-10">List of my Favorite Esports</h4>

          <ul className="list-group">
            {esports &&
              esports.map((esports, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active bg-info" : "")
                  }
                  onClick={() => this.setActiveEsports(esports, index)}
                  key={index}
                >
                  <span className="text-capitalize"> {esports.title}</span>{" "}
                  <br />
                  <span className="text-secondary"> {esports.description}</span>
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentEsports ? (
            <Esports esports={currentEsports} refreshList={this.refreshList} />
          ) : (
            <div>
              <br />
              <p className="font-italic">
                Please click on an Esport you want to view/edit.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
