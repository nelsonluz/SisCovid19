import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import './App.css';
import ItemDetails from './item-details';
import ItemService from './shared/item-service';

class App extends Component {
  constructor(props) {
    super(props);
    this.itemService = new ItemService();
    this.onSelect = this.onSelect.bind(this);
    this.state = {
      showDetails: false,
      selectedItem: null
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
    const listItems = items.map((item) => 
        <Card>
          <Card.Content key={item.link} onClick={() => this.onSelect(item.link)}>
            <Card.Header>{moment(item.Date).format('DD MMMM YYYY')}</Card.Header>
            <Card.Meta><strong>CASOS</strong></Card.Meta>
            <Card.Description></Card.Description>
            <Card.Description><strong> Ativos:</strong> {item.Active}</Card.Description>
            <Card.Description><strong>Confirmados:</strong> {item.Confirmed}</Card.Description> 
            <Card.Description><strong> Recuperados:</strong> {item.Recovered}</Card.Description>
            <Card.Description><strong> Morte:</strong> {item.Deaths}</Card.Description>
          </Card.Content>
        </Card>
    );
    return (
      <div className="App">
          <h1> Dados Covid-19 no Brasil</h1>
          <Card.Group>
              {listItems}
          </Card.Group>
            {showDetails && selectedItem && <ItemDetails item={selectedItem} onEdit={this.onEditItem}  onDelete={this.onDeleteItem} />}
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
  clearState() {
    this.setState({
      showDetails: false,
      selectedItem: null
    });
  }
}
export default App;
