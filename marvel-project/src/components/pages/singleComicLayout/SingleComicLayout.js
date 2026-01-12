import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

import './singleComicLayout.sass';

    
const SingleComicLayout = ({ data }) => {

    const { title, description, pageCount, thumbnail, textObjects, prices } = data;

    return (
        <div className='single-comic'>
            <Helmet>
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content={`${title} comics book`}
                />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className='single-comic__img' />
            <div className='single-comic__info'>
                <h2 className='single-comic__name'>{title}</h2>
                <p className='single-comic__descr'>{description}</p>
                <p className='single-comic__descr'>Pages: {pageCount}</p>
                <p className='single-comic__descr'>Language: {textObjects}</p>
                <div className='single-comic__price'>{prices}</div>
            </div>
            <Link to="/comics" className='single-comic__back'>Back to all</Link>
        </div>
    )
}

export default SingleComicLayout;