import React, {Component} from 'react';
import './FooterStyles.css';

class Footer extends Component {
    render() {
        return(
            <div className="footer img-container">
                <img className="footer-logo" src={ require('../../images/logo2.png') } />
                <a href="https://github.com/cytioapp" target="_blank">
                    <img className="git-logo" src={ require('../../images/git.png') } />
                </a>
            </div>
        );
    }
}

export default Footer