/**
 * File Created by zbj at 2017/8/18.
 * Copyright 2016 CMCC Corporation Limited.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of
 * ZYHY Company. ("Confidential Information").  You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license.
 *
 *
 * @Desc
 * @author zbj
 * @date 2017/8/18
 * @version
 */
import React, {Component} from 'react';
import $ from 'jquery';
import 'blueimp-file-upload';

class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        };
    }
    componentDidMount() {
        let url = 'https://jquery-file-upload.appspot.com/';
        let _self = this;
        let $uploader = $(_self.upload);
        $uploader.fileupload({
            url: url,
            dropZone: $uploader,
            done: function (e, data) {
                let files = _self.state.files;
                files.push(data.files);
                _self.setState({files});
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#progress .progress-bar').css(
                    'width',
                    progress + '%'
                );
            }
        });
    }
    onChange(e) {
        this.setState({
            files: []
        });
    }
    render() {
        return (
            <div className="fileinput-button">
                <input ref={(e) => this.upload = e} type="file" name="files[]" multiple onChange={() => this.onChange()} onDrop={() => this.onChange()}/>
                <div id="progress" className="progress">
                    <div className="progress-bar progress-bar-success"></div>
                </div>
            </div>
        );
    }
}

export default Uploader;
