import React from "react";
import { ChevronLeft, ChevronRight, Search } from "react-feather";
import { Badge, Card, CardBody, Col, Container, Pagination, PaginationItem, PaginationLink, Row, Table, Input, FormGroup } from "reactstrap";
import http from '../../http';
import debounce from 'debounce-promise';

const getMemberData = debounce((page, perPage, search) => http.get('/member', { params: { per_page: perPage, page, name: search }}), 400)

class Member extends React.Component{
  state = {
    members: [],
    pagination: {
      page: 1,
      per_page: 7,
      total_data: 0,
      total_page: 0
    },
    search: ""
  }

  async loadData(page = 1, perPage = 7) {
    await getMemberData(page, perPage, this.state.search)
    .then(res => {
      this.setState({ members: res.data.content, pagination: res.data.pagination })
    })
  }

  async next() {
    if (this.state.pagination.page < this.state.pagination.total_data) {
      await this.loadData(this.state.pagination.page + 1)
    }
  }

  async prev() {
    if (this.state.pagination.page > 1) {
      await this.loadData(this.state.pagination.page - 1)
    }
  }

  async handleSearchOnchange(search) {
    await this.setState({ search });
    await this.loadData(this.state.pagination.page);
  }

  async componentWillMount() {
    await this.loadData();
  }

  render(){

    const member = this.state.members.map((i, index) => {
      return (
      <tr key={index}>
        <td>{ i.name }</td>
        <td>{ i.nim }</td>
        <td>{ i.class_of }</td>
        <td>{ i.major_name }</td>
        <td>
          { i.is_alumni ? 
          <Badge color="success" >Alumni</Badge> : 
          <Badge color="info">Student</Badge> 
          }
        </td>
      </tr>
      )
    })

    const table = (
      <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Nim</th>
              <th>Class Of</th>
              <th>Major</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            { member }
          </tbody>
        </Table>
    )

    // const leftPaginationStart = this.state.pagination.page > 4 ? 
    const paginationItems = [];
    const margin = 3;
    const page = this.state.pagination.page;
    const totalPage = this.state.pagination.total_page;

    const startIndex = page - margin;
    const isStartOffset = startIndex < 1;
    let start = isStartOffset ? 1 : startIndex;

    const endIndex = page + margin;
    const isEndOffset = endIndex > totalPage;
    let end = isEndOffset ? totalPage : endIndex;

    if (!isEndOffset && isStartOffset) {
      end = end + (margin - (page - start));
    }

    if (!isStartOffset && isEndOffset) {
      start = start - (margin - (totalPage - page));
    }

    for (let i = start; i <= end; i++) {
      paginationItems.push((
        <PaginationItem active={i === this.state.pagination.page} key={`pag-${i}`}>
          <PaginationLink onClick={() => {this.loadData(i)}}>{i}</PaginationLink>
        </PaginationItem>
      ));
    }

    const pagination = (
      <Pagination className="d-flex justify-content-end mt-2 pagination-danger">
        <PaginationItem>
          <PaginationLink onClick={() => { this.prev() }} first>
            <ChevronLeft />
          </PaginationLink>
        </PaginationItem>
        { paginationItems }
        <PaginationItem>
          <PaginationLink onClick={() => { this.next() }} last>
            <ChevronRight />
          </PaginationLink>
        </PaginationItem>
    </Pagination>
    )

    const searchbar = (
      <FormGroup className="position-relative has-icon-left">
      <Input type="text" value={this.state.search} placeholder="Search Member" onChange={(e) => this.handleSearchOnchange(e.target.value)} />
      <div className="form-control-position">
        <Search size={15} />
      </div>
    </FormGroup>
    )

    return (
      <Container>
        <Row>
          <Col>
            <Card>
                <CardBody>
                  { searchbar }
                  { table }
                  { pagination }
                </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Member