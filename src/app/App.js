import React, { Component } from 'react';
import { DataTable } from 'primereact/components/datatable/DataTable';
import {DataGrid} from 'primereact/components/datagrid/DataGrid';
import { Column } from 'primereact/components/column/Column';
import { CarService } from './../service/CarService';
import { Button } from "primereact/components/button/Button";
import { Dialog } from "primereact/components/dialog/Dialog";
import { InputText } from "primereact/components/inputtext/InputText";
import logo from './../logo.svg';
import './App.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';

class App extends Component {

  constructor() {
    super();
    this.state = {};
    this.carservice = new CarService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.onCarSelect = this.onCarSelect.bind(this);
    this.addNew = this.addNew.bind(this);
  }

  componentDidMount() {
    this.carservice.getCarsSmall().then(data => this.setState({ cars: data }));
  }

  save() {
    let cars = [...this.state.cars];
    if (this.newCar)
      cars.push(this.state.car);
    else
      cars[this.findSelectedCarIndex()] = this.state.car;

    this.setState({ cars: cars, selectedCar: null, car: null, displayDialog: false });
  }

  delete() {
    let index = this.findSelectedCarIndex();
    this.setState({
      cars: this.state.cars.filter((val, i) => i !== index),
      selectedCar: null,
      car: null,
      displayDialog: false
    });
  }

  findSelectedCarIndex() {
    return this.state.cars.indexOf(this.state.selectedCar);
  }

  updateProperty(property, value) {
    let car = this.state.car;
    car[property] = value;
    this.setState({ car: car });
  }

  onCarSelect(e) {
    this.newCar = false;
    this.setState({
      displayDialog: true,
      car: Object.assign({}, e.data)
    });
  }

  addNew() {
    this.newCar = true;
    this.setState({
      car: { vin: '', year: '', brand: '', color: '' },
      displayDialog: true
    });
  }

  render() {
    let header = <div className="ui-helper-clearfix" style={{ lineHeight: '1.87em' }}>CRUD for Cars </div>;

    let footer = <div className="ui-helper-clearfix" style={{ width: '100%' }}>
      <Button style={{ float: 'left' }} icon="fa-plus" label="Add" onClick={this.addNew} />
    </div>;

    let dialogFooter = <div className="ui-dialog-buttonpane ui-helper-clearfix">
      <Button icon="fa-close" label="Delete" onClick={this.delete} />
      <Button label="Save" icon="fa-check" onClick={this.save} />
    </div>;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">BARRIER DESKTOP</h1>
        </header>

        <div className="container">

        <div className="ui-grid ui-grid-responsive ui-fluid">
          <div className="ui-g-6">
            <DataGrid value={this.state.cars} ></DataGrid>
          </div>
          
          <div className="ui-g-6">
            <DataTable value={this.state.cars} paginator={true} rows={10} header={header} footer={footer}
            selectionMode="single" selection={this.state.selectedCar} onSelectionChange={(e) => { this.setState({ selectedCar: e.data }); }}
            onRowSelect={this.onCarSelect}>
            <Column field="vin" header="Vin" sortable={true} />
            <Column field="year" header="Year" sortable={true} />
            <Column field="brand" header="Brand" sortable={true} />
            <Column field="color" header="Color" sortable={true} />
          </DataTable>
          </div>
        </div>

          

          <Dialog visible={this.state.displayDialog} header="Car Details" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
            {this.state.car && <div className="ui-grid ui-grid-responsive ui-fluid">
              <div className="ui-grid-row">
                <div className="ui-grid-col-4" style={{ padding: '4px 10px' }}><label htmlFor="vin">Vin</label></div>
                <div className="ui-grid-col-8" style={{ padding: '4px 10px' }}>
                  <InputText id="vin" onChange={(e) => { this.updateProperty('vin', e.target.value) }} value={this.state.car.vin} />
                </div>
              </div>
              <div className="ui-grid-row">
                <div className="ui-grid-col-4" style={{ padding: '4px 10px' }}><label htmlFor="year">Year</label></div>
                <div className="ui-grid-col-8" style={{ padding: '4px 10px' }}>
                  <InputText id="year" onChange={(e) => { this.updateProperty('year', e.target.value) }} value={this.state.car.year} />
                </div>
              </div>
              <div className="ui-grid-row">
                <div className="ui-grid-col-4" style={{ padding: '4px 10px' }}><label htmlFor="brand">Brand</label></div>
                <div className="ui-grid-col-8" style={{ padding: '4px 10px' }}>
                  <InputText id="brand" onChange={(e) => { this.updateProperty('brand', e.target.value) }} value={this.state.car.brand} />
                </div>
              </div>
              <div className="ui-grid-row">
                <div className="ui-grid-col-4" style={{ padding: '4px 10px' }}><label htmlFor="color">Color</label></div>
                <div className="ui-grid-col-8" style={{ padding: '4px 10px' }}>
                  <InputText id="color" onChange={(e) => { this.updateProperty('color', e.target.value) }} value={this.state.car.color} />
                </div>
              </div>
            </div>}
          </Dialog>
        </div>
      </div>
    );
  }
}

export default App;
