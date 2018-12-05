import React, { Component } from 'react';
import axios from 'axios';
import List from './List';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alamat: [], // list alamat yang disimpan
            tempAlamat: {
                address_name: '',

                id_province: '',
                prov_name: '',

                id_regency: '',
                reg_name: '',

                id_district: '',
                dist_name: ''
            }, // alamat yang sedang dipilih

            provinces: [], // list province
            regencies: [], // list regency of province
            districts: [], // list district of regency

            isFulfilled: false   // flag/tanda bahwa form telah diisi
        };
    }
    componentDidMount(){
        axios.get('http://172.16.4.126:1337/province')
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
        const findProv = this.state.provinces.find(p => p.id === prov);

        this.setState(state => {
            state.tempAlamat = {
                ...state.tempAlamat,
                id_province: findProv.id,
                prov_name: findProv.name
            }
            return state;
        });

        this.getRegenciesByProvince(prov);
    }
    getRegenciesByProvince(idProvince){
        axios.get('http://172.16.4.126:1337/regency/'+idProvince)
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
        const findReg = this.state.regencies.find(r => r.id === reg);

        this.setState(state => {
            state.tempAlamat = {
                ...state.tempAlamat,
                id_regency: findReg.id,
                reg_name: findReg.name
            }
            return state;
        });

        this.getDistrictsByRegency(reg);
    }
    getDistrictsByRegency(idRegency){
        axios.get('http://172.16.4.126:1337/district/'+idRegency)
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
        const findDis = this.state.districts.find(d => d.id === dis);

        this.setState(state => {
            state.tempAlamat = {
                ...state.tempAlamat,
                id_district: findDis.id,
                dist_name: findDis.name,
            }
            return state;
        }, () => this.validateData());
    }
    changeAddressName(e){
        const address = e.target.value;
        this.setState(state => {
            state.tempAlamat.address_name = address;
            return state;
        }, () => this.validateData());
    }
    tambahAlamat(){
        const newObj = Object.assign({}, this.state.tempAlamat);
        this.setState(state => {
            state.alamat.push(newObj);
            state.regencies = [];
            state.districts = [];
            state.tempAlamat = {
                address_name: '',

                id_province: '',
                prov_name: '',

                id_regency: '',
                reg_name: '',

                id_district: '',
                dist_name: ''
            };
            state.isFulfilled = false;
            return state;
        });
    }
    hapusAlamat(e, index){
        this.setState(state => {
            delete state.alamat[index];
            return state;
        })
    }
    validateData(){
        if(this.state.tempAlamat.address_name !== ''
            && this.state.tempAlamat.dist_name !== ''){
            this.setState({
                isFulfilled: true
            })
        } else {
            this.setState({
                isFulfilled: false
            })
        }
    }
    render(){
        return (
            <div>
                Nama: <input type="text" 
                            onChange={(e) => this.changeAddressName(e)}
                            value={this.state.tempAlamat.address_name}
                            placeholder="Nama Alamat"/>
                <br/>

                Provinsi:
                <select onChange={(e) => { this.changeProvince(e) }} 
                    value={this.state.tempAlamat.id_province}>
                    <option>-- Pilih Provinsi --</option>
                    { this.state.provinces.map(prov => 
                        <option key={prov.id} value={prov.id}>{ prov.name }</option>
                        ) }
                </select>
                <br/>

                Kota:
                <select onChange={(e) => this.changeRegency(e)}
                    value={this.state.tempAlamat.id_regency}>
                    <option>-- Pilih Kota --</option>
                    { this.state.regencies.map(reg => 
                        <option key={reg.id} value={reg.id}>{ reg.name }</option>
                        ) }
                </select>
                <br/>

                Kecamatan:
                <select onChange={(e) => this.changeDistrict(e)}
                    value={this.state.tempAlamat.id_district}>
                    <option>-- Pilih Kecamatan --</option>
                    { this.state.districts.map(dis => 
                        <option key={dis.id} value={dis.id}>{ dis.name }</option>
                        ) }
                </select>
                <br/>

                <button 
                    disabled={!this.state.isFulfilled}
                    onClick={() => this.tambahAlamat()}>
                    Simpan
                </button>

                <hr/>
                <List alamat={this.state.alamat}
                    hapus={this.hapusAlamat.bind(this)}
                />
            </div>
        )
    }
}

export default Form;