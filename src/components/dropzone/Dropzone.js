import React, { PureComponent } from 'react';
import classname from 'classname';
import ReactDropzone from 'react-dropzone';
import isEmpty from 'lodash/isEmpty';

class Dropzone extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageBase64: props.value
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      imageBase64: newProps.value
    })
  }

  onDropHandler = (acceptedFiles) => {
     acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        const binaryStr = reader.result;
        this.setState({imageBase64 : binaryStr});
        this.props.onDrop(binaryStr);
      }
      reader.readAsDataURL(file)
    })
  }

  render() {

    const { imageBase64 } = this.state;
    const { className, onDrop, style, ...props } = this.props;
    const classComponent = classname('dropzone', className,{
      'dropzone--filled': (!isEmpty(imageBase64))
    });    

    return (
      <ReactDropzone onDrop={this.onDropHandler} className={classComponent} style={style}>
        <i className='icon icon-photo' />
        <img src={imageBase64} />
      </ReactDropzone>
    );
  }
}

export default Dropzone;