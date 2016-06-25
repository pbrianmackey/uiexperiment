import React from 'react';
import {Modal, Col, Button, FormGroup, ControlLabel, HelpBlock, FormControl, Radio, Table, Glyphicon
,OverlayTrigger, Popover, Tooltip, Alert} from 'react-bootstrap'
import DatePicker from 'react-bootstrap-date-picker'

const dataModel = [
    {date: "01/01/2016", description: "Simple Ceasar sniffed his sifter", action: ""},
    {date: "06/12/15 - 06/15/15", description: "Seized his knees", action: ""},
    {date: "04/27/2015", description: "And sneezed", action: ""}
  ];

var page1 = React.createClass({
  getInitialState() {
    return {
      model: dataModel,
      superhero: '',
      superheroPlaceholder: '',
      sidekick: '',
      sidekickPlaceholder: '',
      sidekickError: false,
      startDate: '',
      endDate: '',
      showModal: false,
      selectDateOther: '',
      showOverlay: false,
      showError: false,
      endDateError: false,
    };
  },

  getValidationState() {
    const length = this.state.superhero.length;
    if (length > 10) return;
    else if (length > 0) return;
  },

  getValidationStateRobin(){
    let sidekickState = this.state.sidekick;
    console.log('getValidationStateRobin', sidekickState);
    if(sidekickState === 'Robin'){
      return;
    }else if(sidekickState !== ''){
      return 'error';
    }
  },

  getValidationStateForDate() {
    const length = this.state.superhero.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  },

  handleChange(e) {
    this.setState({ superhero: e.target.value });
  },


  handleChangeSidekick(e) {
    var sidekickState = e.target.value;
    console.log('handleChangeSidekick', sidekickState);
    if(sidekickState && !this.lettersOnly(sidekickState)){
      console.log('naw man!');
      this.setState({showError: true});

    }else{
      this.setState({ sidekick: e.target.value });
      this.setState({showError: false});
    }

    if(sidekickState === 'Robin'){
      this.setState({sidekickError: false});
    }else {
      this.setState({sidekickError: true});
    }
  },

  lettersOnly(input) {
   var letters = /^[A-Za-z]+$/;
   if(input.match(letters)){
      return true;
   }else {
     return false;
   }
 },

 numbersOnly(input) {
  var numbers = /^[0-9]+$/;
  if(input.match(numbers)){
     return true;
  }else {
    return false;
  }
},

  handleChangeStartDate(value) {
    this.setState({ startDate: value });
    this.setState({endDateError: false});
    /*
    if(numbersOnly(value)){

    }else{
      console.log('numbers only please');
    }*/
  },

  handleChangeEndDate(value) {
    if(this.state.startDate > value){
      console.log('start date greater then end date');
      this.setState({endDateError: true});
    }else{
      this.setState({endDateError: false});
    }
    this.setState({ endDate: value });
  },

  handleChangeSelectDate(value){
    this.setState({ selectDateOther: value });
  },

  handleFocus(e){
    this.setState({superheroPlaceholder: e.currentTarget.placeholder});
    e.currentTarget.removeAttribute('placeholder');
  },

  handleBlur(e){
    e.currentTarget.placeholder = this.state.superheroPlaceholder;
  },

  handleFocusSidekick(e){
    console.log('focus had', e.currentTarget.placeholder);
    this.setState({sidekickPlaceholder: e.currentTarget.placeholder});
    e.currentTarget.removeAttribute('placeholder');
  },

  handleBlurSidekick(e){
    console.log('blur done');
    e.currentTarget.placeholder = this.state.sidekickPlaceholder;
  },

  handleClick(e){
    console.log('button clicked');
    this.setState({ showModal: true });
  },

  handleDescriptionChange(e){
    var index = e.target.parentNode.getAttribute("data-rowindex");
    var length = e.currentTarget.value.length;

    if(length > 200){
      console.log('too long');
    }else{
      var modelState = this.state.model;
      modelState[index].description = e.currentTarget.value;
      this.setState({model: modelState});
    }
 },

 deleteRowDescription(e){
    var index = e.target.getAttribute("data-rowindex");
    var modelState = this.state.model;
    modelState[index].description = "";
    this.setState({model: modelState});
 },

  render: function() {
    console.log('render');
    let popover = <Popover id="myPopover" title="popover">very popover. such engagement</Popover>;
    let tooltip = <Tooltip id="myTooltip">Favorite comic book Superhero is used to tailor your payroll experience.</Tooltip>;
    let sideKickErrorMessage;

    if(this.state.sidekickError){
      sideKickErrorMessage = (
        <div>
          <span id="u304" className="ax_default icon" data-label="mark">
            <img id="u304_img" className="img " style={{paddingBottom: "9px", paddingLeft: "8px"}}
            src="http://d26uhratvi024l.cloudfront.net/gsc/4JPEH2/60/04/15/600415bd9ccf43f1920f9f87b2817533/images/ui_library/mark_u304.png?token=d6563bf09a9a434b5e25ea0a4f45d34a" />
          </span>
          <span style={{color: '#E93716', fontSize: '12px', paddingLeft: '5px'}}>Sidekick is a required field.</span>

        </div>
      );
    }

    let error;
    if(this.state.showError){
      error = (<Alert bsStyle="warning">
      <strong>Alpha characters only</strong>
    </Alert>);
    }

    let endDateError;

    if(this.state.endDateError){
      endDateError = (<div style={{color: 'red'}}>Start Date cannot be before end date</div>

      );
    }

    return (
        <div id="outerContainer">
          {error}
          <form>

            <Col md={12}>
              <h3>Field Inputs and Validation</h3>
              <Col xs={12} md={4}>
                <Col xs={12} md={12}>
                  <FormGroup
                    controlId="formSuperheroText"
                    validationState={this.getValidationState()}
                  >
                    <ControlLabel>
                      Favorite Comic Book Superhero
                      <OverlayTrigger show={this.state.showOverlay}
                        rootClose={true}
                        onHide={() => this.setState({showOverlay: false})}
                        trigger="click"
                        overlay={tooltip}
                      >
                        <Button id="glpyhContainer" className="glphyStyle btn-icon">
                          <Glyphicon glyph="info-sign" style={{color: "#00b4f1"}}/>
                        </Button>
                      </OverlayTrigger>
                    </ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.superhero}
                      placeholder="e.g. Batman"
                      onChange={this.handleChange}
                      onFocus={this.handleFocus}
                      onBlur={this.handleBlur}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                </Col>
              </Col>
              <Col xs={12} md={4}>
                <FormGroup
                  controlId="formSidekickText"
                  validationState={this.getValidationStateRobin()}
                >
                  <ControlLabel>Favorite Comic Book Sidekick<span className="required">*</span></ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.sidekick}
                    placeholder="e.g. Robin"
                    onChange={this.handleChangeSidekick}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                  />
                  {sideKickErrorMessage}
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
              <Col xs={12} md={4}></Col>
            </Col>

            <Col md={12}>
              <h3>Date Range Picker</h3>
              <Col xs={12} md={4}>
                <Col md={6}>
                  <FormGroup>
                    <ControlLabel>Start Date</ControlLabel>
                    <DatePicker value={this.state.startDate} onChange={this.handleChangeStartDate} />
                    {endDateError}
                  </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                  <ControlLabel>End Date</ControlLabel>
                  <DatePicker value={this.state.endDate} onChange={this.handleChangeEndDate} />
                  {endDateError}
                </FormGroup>
                </Col>
              </Col>
              <Col xs={12} md={4}>
                <div id="dateSelectHelper">Select April 29 - May 4th</div>
              </Col>
              <Col xs={12} md={4}></Col>
            </Col>

            <Col md={12}>
              <h3>Modal</h3>
              <Col xs={12} md={4}>
                <Button bsStyle="primary" onClick={this.handleClick}><span className="glyphicon glyphicon-transfer"></span>Open Modal</Button>
              </Col>
              <Col xs={12} md={4}></Col>
              <Col xs={12} md={4}></Col>
            </Col>
          </form>

          <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
            <Modal.Header closeButton>
              <Modal.Title>Open Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div id="modalBodyOuterContainer">
                <Col xs={12} md={12}>
                  <Col md={8}>
                    <FormGroup controlId="formControlsSelect">
                      <ControlLabel>Dropdown</ControlLabel>
                      <FormControl componentClass="select" placeholder="select">
                        <option value="select">Select</option>
                        <option value="Do">Do</option>
                        <option value="Ray">Ray</option>
                        <option value="Mi">Mi</option>
                        <option value="Fa">Fa</option>
                        <option value="So">So</option>
                        <option value="La">La</option>
                        <option value="Ti">Ti</option>
                        <option value="Do">Do</option>
                      </FormControl>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                  <FormGroup>
                    <ControlLabel>Select Date</ControlLabel>
                    <DatePicker value={this.state.selectDateOther} onChange={this.handleChangeSelectDate} />
                  </FormGroup>
                  </Col>
                </Col>
                <Col xs={12} md={12}>
                  <Radio>
                    Radio Button
                  </Radio>
                </Col>
                <Col xs={12} md={12}>
                  <Table striped bordered condensed hover className="paycor-table">
                    <thead className="tableHeaderStyle">
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.model.map((item, index) =>
                        <tr key={index}>
                          <td>{item.date}</td>
                          <td data-rowindex={index}>
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="myTooltip">{item.description}</Tooltip>
                              }
                            >
                            <input
                              onChange={this.handleDescriptionChange}
                              type="text"
                              value={item.description}
                            />
                            </OverlayTrigger>
                          </td>
                          <td>
                            <Button data-rowindex={index} onClick={this.deleteRowDescription}>
                              <Glyphicon data-rowindex={index} glyph="trash" />
                            </Button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Col>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.setState({ showModal: false })}><span className="glyphicon glyphicon-remove"></span>Cancel</Button>
              <Button onClick={() => this.setState({ showModal: false })} bsStyle="primary"><span className="glyphicon glyphicon-ok"></span>Save</Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
  }
});

module.exports = page1;
