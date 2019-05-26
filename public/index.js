// Framework
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import ShowModal from './components/ShowModal/showModal';
import ShowPreview from './components/ShowPreview/showPreview';

// Styles
import './index.less'

class CrunchyRollImagesApp extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      showList: undefined,
      searchText: '',
      selectedShow: undefined
    };
    this.originalList = undefined;
  }

  componentDidMount() {
    // Get crunchyroll images from backend
    fetch('/crunchyimages')
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        this.originalList = jsonResponse;
        this.setState({
          showList: jsonResponse,
          loading: false
        });
      })
      .catch((err) => {
        this.setState({
          loading: false
        });
      });
  }

  handleShowSelection = (idx) => {
    const { showList } = this.state;

    // Add class to body
    document.getElementsByTagName('body')[0].classList.add('noScroll');

    this.setState({
      selectedShow: showList[idx]
    });
  };

  handleModalClose = () => {
    // Remove class from body
    document.getElementsByTagName('body')[0].classList.remove('noScroll');

    this.setState({
      selectedShow: undefined
    });
  };

  handleSearchType = (evt) => {
    const text = evt.target.value;

    this.setState({
      showList: this.originalList.filter(show => show.caption && show.caption.includes(text)),
      searchText: text
    });
  };

  handleSearchClear = () => {
    this.setState({
      showList: [...this.originalList],
      searchText: ''
    });
  };

  render() {
    const { showList, loading, searchText, selectedShow } = this.state;

    return (
      <main className="content">
        <header className="header">
          <input
            type="text"
            value={searchText}
            onChange={this.handleSearchType}
            className="header-search"
            placeholder="Show search"
          />
          <button
            onClick={this.handleSearchClear}
            className="header-clear"
          >
            X
          </button>
        </header>
        <section className="showList">
          {
            loading
            && <p className="loader">Loading...</p>
          }
          {
            !loading
            && showList.length
            && showList.map((show, idx) => {
              const caption = show.caption || undefined;
              const thumbnail = show.thumb || undefined;

              return (
                <ShowPreview
                  key={idx}
                  showIndex={idx}
                  showImageUrl={thumbnail}
                  showCaption={caption}
                  handleShowSelection={this.handleShowSelection}
                />
              );
            })
          }
          {
            !loading
            && !showList.length
            && <p className="noResults">No results found</p>
          }
        </section>
        {
          selectedShow !== undefined
          && <ShowModal
              image={selectedShow.original}
              caption={selectedShow.caption}
              closeModal={this.handleModalClose}
             />
        }
      </main>
    )
  }
}

ReactDOM.render(<CrunchyRollImagesApp />, document.getElementById('app'));

module.hot.accept();