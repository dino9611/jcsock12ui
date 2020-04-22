import React, {Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    messages:[],
    usercount:0
  }

  componentDidMount(){
    const socket = io('http://localhost:2020/',{transports: [ 'websocket' ]});

    socket.on('chat message', this.updateMessages);
    socket.on('user connected', (count)=>this.setState({usercount:count}));

    axios.get('http://localhost:2020/chat/getmessages')
    .then((res) => {
      this.setState({messages:res.data})
    })
  }


  updateMessages = (msgs) => {
    this.setState({messages:msgs})
  }

  onBtnSendClick = () => {
    axios.post('http://localhost:2020/chat/sendmessage', {
      nama: this.refs.nama.value,
      message: this.refs.message.value
    }).then((res) => {
      console.log(res.data)
    })
  }

  onBtnClearClick = () => {
    axios.delete('http://localhost:2020/chat/clearmessages')
    .then((res) => {
      console.log(res.data)
    })
  }

  renderListMessage = () => {
    return this.state.messages.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.nama}</td>
          <td>{item.message}</td>
          <td></td>
        </tr>
      )
    })
  }

  pencet=()=>{
    // const socket = io('http://localhost:2020/',{transports: [ 'websocket' ]});
    // socket.emit('tes','blalaaa')
  }

  render() { 
    return (
      <center>
      <h2>Chat Group (User Connected : {this.state.usercount})</h2>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Message</th>
            <th><input type="button" value="Clear" onClick={this.onBtnClearClick} /></th>
          </tr>
        </thead>
        <tbody>
          {this.renderListMessage()}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <input type="text" ref='nama' />
            </td>
            <td>
              <input type="text" ref='message' />
            </td>
            <td>
              <input type="button" value="Send" onClick={this.onBtnSendClick} />
              <button onClick={this.pencet}>dasd</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </center>
      );
  }
}
 
export default App;
