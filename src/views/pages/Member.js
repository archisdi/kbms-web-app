import React from "react"

import http from '../../http';

class Member extends React.Component{
  state = {
    members: [],
    pagination: {
      page: 1,
      per_page: 10,
      total_data: 0,
      total_page: 0
    }
  }

  async componentWillMount() {
    await http.get('/member')
      .then(res => {
        this.setState({
          members: res.data.content,
          pagination: res.data.pagination
        })
      })
  }

  render(){

  const list = this.state.members.map(i => <li>{i.name}</li>)

    return (
      <div>
        <h4>This member Page.</h4>
        <ul>
          {list}
        </ul>
      </div>
    )
  }
}

export default Member