import React from 'react';
import PropTypes from 'prop-types';
import logoCharityLoaing from '../../images/logo.png';
import loadingGif from '../../images/loading.gif'
import { Dna } from 'react-loader-spinner'

Loading.propTypes = {

};

function Loading(props) {
    const style = {
        zIndex: 100,
        
    }
    return (
        <div style={{zIndex:100,backgroundColor:'rgba(70,70,70,0.4)'}} className="position-fixed  start-0 end-0 top-0 bottom-0 ">
            <div className="container-fluid d-flex flex-column h-100 align-items-center justify-content-center">
                <div style={{ display:'flex',justifyContent:'center'}}>

                    <img src={logoCharityLoaing} style={{height:'100px'}} className="img-fluid p-3" alt="Loading..." />
                </div>
                <Dna
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                    />
            </div>
        </div>
    );
}

export default Loading;