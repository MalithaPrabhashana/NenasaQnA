import React from 'react'
import "./css/SidebarOptions.css"
import {Card} from 'react-bootstrap';


function SidebarOptions({select, props}) {

    const sidebarOptions = ['Online Paper Writing', 'Past Papers Repository', 'Ask for Councelling']
    const sidebarOptionsTea = ['Markable Papers'];
    const sidebarOptionsLec = [];
    const sidebarOptionsCoun = [];

    const sidebar_icons = ['fa fa-edit', 'fa fa-book', 'fa fa-comments']
    const actor = [sidebarOptions, sidebarOptionsTea, sidebarOptionsLec, sidebarOptionsCoun];


    const role = localStorage.getItem('role');

    function getRoleName(role) {
        switch (role) {
            case '0':
                return 'Student';
            case '1':
                return 'Teacher';
            case '2':
                return 'Lecturer';
            case '3':
                return 'Counseller';
            default:
                return 'Unknown';
        }
    }


    return (
        <div className="sidebarOptions">
            <Card style={
                {
                    width: '95%',
                    textAlign: 'center',
                    backgroundColor: '#1960EA',
                    color: '#fff',
                    marginBottom: '10px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }
            }>
                <Card.Body>
                    <Card.Title className='roleIdentificationCard'>
                        {
                        localStorage.getItem('username')
                    }</Card.Title>
                    <Card.Text className='roleIdentificationCard'>
                        {
                        'You are a ' + getRoleName(role)
                    } </Card.Text>
                </Card.Body>
            </Card>

            {
            (() => {
                if (select.user) {
                    return(actor[select.user.role].map((sidebarOption, index) => {
                        if (sidebarOption !== null) {
                            return (
                                <div key={
                                        "sidebar_" + (
                                            index + 1
                                        )
                                    }
                                    className="sidebarOption"
                                    onClick={
                                        () => {
                                            select.sideBarNavigationSet(index + 1);
                                            select.endUserSet(false)
                                        }
                                }>
                                    <i className={
                                        sidebar_icons[index]
                                    }></i>
                                    <h6>{sidebarOption}</h6>
                                </div>
                            );
                        }

                    }));
                }

            })()
        }

            </div>
    );
}


export default SidebarOptions
