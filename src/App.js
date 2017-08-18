import React, {Component} from 'react';
import ReactTable from 'react-table';
import Notifications, { notify } from './components/Toast';
import Uploader from './components/Uploader';
import 'whatwg-fetch';
import 'react-table/react-table.css';
import './App.css';

class App extends Component {
    fetch() {
        fetch('mock/test.json').then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log('parsed json', json);
        }).catch(function(ex) {
            console.log('parsing failed', ex);
        });
    }
    show() {
        notify.show('测试', '', 2000, {});
    }
    render() {
        const data = [{
            name: 'Tanner Linsley',
            age: 26,
            friend: {
                name: 'Jason Maurer',
                age: 23,
            }
        }];

        const columns = [{
            Header: 'Name',
            accessor: 'name' // String-based value accessors!
        }, {
            Header: 'Age',
            accessor: 'age',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            id: 'friendName', // Required because our accessor is not a string
            Header: 'Friend Name',
            accessor: d => d.friend.name // Custom value accessors!
        }, {
            Header: () => <span>Friend Age</span>, // Custom header components!
            accessor: 'friend.age'
        }];

        return (
            <div className="App">
                <ReactTable
                    data={data}
                    columns={columns}
                    pageSize={20}
                    showPageSizeOptions={false}
                />
                <Notifications/>
                <input type="button" value="toast" onClick={this.show}/>
                <p>{process.env.REACT_APP_ENV}</p>
                <Uploader/>
                <input type="button" value="接口测试" onClick={this.fetch}/>
            </div>
        );
    }
}

export default App;
