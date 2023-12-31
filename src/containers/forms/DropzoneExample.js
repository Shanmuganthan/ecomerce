/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import 'dropzone/dist/min/dropzone.min.css';

const ReactDOMServer = require('react-dom/server');

export default class DropzoneExample extends Component {


  constructor(props) {
    super(props);
    const {type , maxFilesize} = this.props;
    this.state = {
      dropzoneComponentConfig: {
        postUrl: `${process.env.REACT_APP_BE_END_POINT}upload/img/${type}`,
      },
      dropzoneConfig : {
        thumbnailHeight: 160,
        maxFilesize: maxFilesize || 1,
        previewTemplate: ReactDOMServer.renderToStaticMarkup(
          <div className="dz-preview dz-file-preview mb-3">
            <div className="d-flex flex-row ">
              <div className="p-0 w-30 position-relative">
                <div className="dz-error-mark">
                  <span>
                    <i />{' '}
                  </span>
                </div>
                <div className="dz-success-mark">
                  <span>
                    <i />
                  </span>
                </div>
                <div className="preview-container">
                  {/*  eslint-disable-next-line jsx-a11y/alt-text */}
                  <img data-dz-thumbnail className="img-thumbnail border-0" />
                  <i className="simple-icon-doc preview-icon" />
                </div>
              </div>
              <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
                <div>
                  {' '}
                  <span data-dz-name />{' '}
                </div>
                <div className="text-primary text-extra-small" data-dz-size />
                <div className="dz-progress">
                  <span className="dz-upload" data-dz-uploadprogress />
                </div>
                <div className="dz-error-message">
                  <span data-dz-errormessage />
                </div>
              </div>
            </div>
            <a href="#/" className="remove" data-dz-remove>
              {' '}
              <i className="glyph-icon simple-icon-trash" />{' '}
            </a>
          </div>
        ),
        headers: { 'My-Awesome-Header': 'header value' },
      }

    }
  }

  clear() {
    this.myDropzone.removeAllFiles(true);
  }

  render() {
    const {dropzoneComponentConfig ,dropzoneConfig } = this.state;
    const {setFieldValue , setFieldValueCb ,values, name='image'} = this.props;
  
    return (
      <DropzoneComponent
        config={dropzoneComponentConfig}
        djsConfig={dropzoneConfig}
        eventHandlers={{
          init: (dropzone) => {
            this.myDropzone = dropzone;
          },
          success: (file) => {
            if(setFieldValueCb){
              setFieldValueCb(name,file.name,'A',values)
            }else{
              setFieldValue?.(name ,file.name);
            }  
          },
          removedfile: (file) => {
            if(setFieldValueCb){
              setFieldValueCb(name,file.name,'D',values)
            }else{
            setFieldValue?.(name ,'');
            }
          },
        }}
      />
    );
  }
}
