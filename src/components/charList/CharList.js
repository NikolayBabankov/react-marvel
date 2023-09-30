import { Component } from 'react/cjs/react.production.min';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';


class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false
    }

        
    marvelService = new MarvelService();

    componentDidMount(){
        this.marvelService.getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }


    onCharListLoaded = (data) => {
        this.setState({
            charList: data,
            loading: false
        });
    }

    onError = () =>{
        this.setState({
            loading: false,
            error: true
        });
    }


    updateCharList = () => {

    }

    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id} onClick={() => this.props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle} className='char__item_img'/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }


    render(){
        const {charList, loading, error} = this.state;
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

// const CharListElements = ({data}) => {

//     const elements = data.map(item => {
//         const {name, thumbnail, id} = item;
//         const classNameImg = thumbnail.includes("image_not_available") ?  "char__item_img char__item_img_contain" : "char__item_img";
//         return (
//             <li className="char__item" key={id} onClick={() => this.props.onCharSelected(id)}>
//                 <img src={thumbnail} alt="abyss" className={classNameImg}/>
//                 <div className="char__name">{name}</div>
//             </li>
//         )
//     })

//     return (
//         <ul className="char__grid">
//             {elements}
//         </ul>
//     )
// }

export default CharList;