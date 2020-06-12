import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import './App.css';
import ItemDetails from './item-details';
// import NewItem from './new-item';
// import EditItem from './edit-item';
import ItemService from './shared/item-service';

class App extends Component {
  constructor(props) {
    super(props);
    this.itemService = new ItemService();
    this.onSelect = this.onSelect.bind(this);
    // this.onNewItem = this.onNewItem.bind(this);
    // this.onEditItem = this.onEditItem.bind(this);
    // this.onCancel = this.onCancel.bind(this);
    // this.onCancelEdit = this.onCancelEdit.bind(this);
    // this.onCreateItem = this.onCreateItem.bind(this);
    // this.onUpdateItem = this.onUpdateItem.bind(this);
    // this.onDeleteItem = this.onDeleteItem.bind(this);
    this.state = {
      showDetails: false,
      editItem: false,
      selectedItem: null,
      newItem: null
    }
  }
  componentDidMount() {
      this.getItems();
  }
  render() {
    moment.locale('pt-br');
    const items = this.state.items;
    if(!items) return null;
    const showDetails = this.state.showDetails;
    const selectedItem = this.state.selectedItem;
    // const newItem = this.state.newItem;
    // const editItem = this.state.editItem;
    const listItems = items.map((item) => 
        <Card>
          <Card.Content key={item.link} onClick={() => this.onSelect(item.link)}>
            <Card.Header>{moment(item.Date).format('DD MMMM YYYY')}</Card.Header>
            <Card.Meta><strong>CASOS</strong></Card.Meta>
            <Card.Description></Card.Description>
            <Card.Description><strong> Morte:</strong> {item.Deaths}</Card.Description>
            <Card.Description><strong> Ativos:</strong> {item.Active}</Card.Description>
            <Card.Description><strong> Recuperados:</strong> {item.Recovered}</Card.Description>
            <Card.Description><strong>Confirmados:</strong> {item.Confirmed}</Card.Description> 
          </Card.Content>
        </Card>
    
    );
    // const listItems = items.map((item) =>
    //   <Table.Row key={item.link} onClick={() => this.onSelect(item.link)}>
    //       <Table.Cell>{item.Date}</Table.Cell>
    //       <Table.Cell>{item.Deaths}</Table.Cell>
    //       <Table.Cell>{item.Confirmed}</Table.Cell>
    //   </Table.Row>
    // );
    return (
      <div className="App">
          <h1> Dados Covid-19 no Brasil</h1>
          <Card.Group>
              {listItems}
          </Card.Group>
          {/* <Table celled>
            <Table.Header>
              <Table.Row>
                 <Table.HeaderCell>Data</Table.HeaderCell>
                 <Table.HeaderCell>Morte</Table.HeaderCell>
                 <Table.HeaderCell>Contaminados</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {listItems}
            </Table.Body>
          </Table> */}
          <br/>
          {/* <button type="button" name="button" onClick={() => this.onNewItem()}>New Item</button> */}
          <br/>
            {/* {newItem && <NewItem onSubmit={this.onCreateItem} onCancel={this.onCancel}/>} */}
            {showDetails && selectedItem && <ItemDetails item={selectedItem} onEdit={this.onEditItem}  onDelete={this.onDeleteItem} />}
            {/* {editItem && selectedItem && <EditItem onSubmit={this.onUpdateItem} onCancel={this.onCancelEdit} item={selectedItem} />} */}
      </div>
    );
  }
  getItems() {
    this.itemService.retrieveItems().then(items => {
        console.log(items)
          this.setState({items: items});
        }
    );
  }
  onSelect(itemLink) {
    this.clearState();
    this.itemService.getItem(itemLink).then(item => {
      this.setState({
          showDetails: true,
          selectedItem: item
        });
      }
    );
  }
  onCancel() {
    this.clearState();
  }
  // onNewItem() {
  //   this.clearState();
  //   this.setState({
  //     newItem: true
  //   });
  // }
  // onEditItem() {
  //   this.setState({
  //     showDetails: false,
  //     editItem: true,
  //     newItem: null
  //   });
  // }
  // onCancelEdit() {
  //   this.setState({
  //     showDetails: true,
  //     editItem: false,
  //     newItem: null
  //   });
  // }
  // onUpdateItem(item) {
  //   this.clearState();
  //   this.itemService.updateItem(item).then(item => {
  //       this.getItems();
  //     }
  //   );
  // }
  // onCreateItem(newItem) {
  //   this.clearState();
  //   this.itemService.createItem(newItem).then(item => {
  //       this.getItems();
  //     }
  //   );
  // }
  // onDeleteItem(itemLink) {
  //   this.clearState();
  //   this.itemService.deleteItem(itemLink).then(res => {
  //       this.getItems();
  //     }
  //   );
  // }
  clearState() {
    this.setState({
      showDetails: false,
      selectedItem: null,
      editItem: false,
      newItem: null
    });
  }
}
export default App;
