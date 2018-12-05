import React, { Component } from 'react';
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Provinsi</th>
                            <th>Kota</th>
                            <th>Kecamatan</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.alamat.map((almt, index) => 
                            <tr key={index}>
                                <td>{ index+1 }</td>
                                <td>{ almt.address_name }</td>
                                <td>{ almt.prov_name }</td>
                                <td>{ almt.reg_name }</td>
                                <td>{ almt.dist_name }</td>
                                <td><button onClick={(e) => this.props.hapus(e, index) }>Hapus</button></td>
                            </tr>
                            ) }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default List;