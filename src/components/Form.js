import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            provinces: [],
            idProvince: null,

            regencies: [],
            idRegency: null,
            
            districts: [],
            idDistrict: null,

            isFulfilled: true
        };
    }
    componentDidMount(){
        axios.get('http://172.16.5.195:1337/province')
        .then( response => {
            this.setState({
                provinces: response.data
            })
        }).catch(err => {
            console.log(err);
        });
    }
    changeProvince(e){
        const prov = e.target.value;
        this.setState({
            idProvince: prov
        });

        this.getRegenciesByProvince(prov);
    }
    getRegenciesByProvince(idProvince){
        axios.get('http://172.16.5.195:1337/regency/'+idProvince)
        .then( response => {
            this.setState({
                regencies: response.data
            })
        }).catch(err => {
            console.log(err);
        });
    }
    changeRegency(e){
        const reg = e.target.value;
        this.setState({
            idRegency: reg,
        });

        this.getDistrictsByRegency(reg);
    }
    getDistrictsByRegency(idRegency){
        axios.get('http://172.16.5.195:1337/district/'+idRegency)
        .then( response => {
            this.setState({
                districts: response.data
            })
        }).catch(err => {
            console.log(err);
        });
    }
    changeDistrict(e){
        const dis = e.target.value;
        this.setState({
            idDistrict: dis,
            isFulfilled: false
        });
    }
    render(){
        return (
            <div>
                Nama: <input type="text" placeholder="Nama Alamat"/>
                <br/>

                Provinsi:
                <select onChange={(e) => { this.changeProvince(e) }}>
                    <option>-- Pilih Provinsi --</option>
                    { this.state.provinces.map(prov => 
                        <option key={prov.id} value={prov.id}>{ prov.name }</option>
                        ) }
                </select>
                <br/>

                Kota:
                <select onChange={(e) => this.changeRegency(e)}>
                    <option>-- Pilih Kota --</option>
                    { this.state.regencies.map(reg => 
                        <option key={reg.id} value={reg.id}>{ reg.name }</option>
                        ) }
                </select>
                <br/>

                Kecamatan:
                <select onChange={(e) => this.changeDistrict(e)}>
                    <option>-- Pilih Kecamatan --</option>
                    { this.state.districts.map(dis => 
                        <option key={dis.id} value={dis.id}>{ dis.name }</option>
                        ) }
                </select>
                <br/>

                <button disabled={this.state.isFulfilled} onClick={() => {}}>Simpan</button>
                <hr/>
            </div>
        )
    }
}

export default Form;