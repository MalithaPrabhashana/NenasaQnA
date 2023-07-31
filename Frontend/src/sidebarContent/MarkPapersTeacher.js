
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../components/css/MarkablePapers.css'
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Link } from '@material-ui/core';


const MarkPapersTeacher = ({ selectedTeacherId }) => {

    const [papers, papersSet] = useState(null);
    const [isChanged, isChangedSet] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/paper-marking/get-markables',
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(response => {
            const responseStatus = response.status;
            if (responseStatus === 200 | responseStatus === 201) {
                papersSet(response.data.papers);
            }
        })
    }, [isChanged]);





    if (papers) {
        var rowCounter = 0;
        return (
            <>
                <div style={{ textAlign: 'center', marginBottom: '30px', marginTop: '20px' }}>
                    <h2>Markable Papers</h2>

                </div>
                <hr />
                <div className='my-2 mainWrapper'>
                    {

                        papers.map((paper, index) => {
                            rowCounter++;
                            return (
                                (paper.userUpload !== null) ?
                                    <div className='row p-2 px-4  wrapperDiv' key={'paper_marking_' + index} >
                                        <div className="col col-12 col-md-4">{rowCounter}.&nbsp;&nbsp; {paper.paperName}</div>
                                        <div className="col col-12 col-md-2">
                                            {(paper.userUpload !== null) ?
                                                <Link  >
                                                    <GetAppIcon onClick={() => handleDownload("http://localhost:3000/get-uploads/" + paper.userUpload, paper.paperName + "_answers" + ".pdf")} style={{ cursor: 'pointer', marginLeft: '10px', marginRight: '10px' }} />
                                                </Link> : null
                                            }


                                        </div>
                                        <div className="col col-12 col-md-6">
                                            <div className="row d-flex justify-content-start">
                                                <label >
                                                    <input id={"fileInput_" + index}
                                                        type="number" min="0" max="100"
                                                        defaultValue={paper.marks}
                                                        style={{ width: '50%' }} />
                                                    <button onClick={() => {
                                                        const value = document.getElementById("fileInput_" + index).value;
                                                        if (value) {
                                                            axios.post('http://localhost:3000/paper-marking/update-marks',
                                                                { paperId: paper._id, marks: value },
                                                                {
                                                                    headers: {
                                                                        Authorization: 'Bearer ' + localStorage.getItem('token')
                                                                    }
                                                                }
                                                            ).then(response => {
                                                                const responseStatus = response.status;
                                                                if (responseStatus === 200 | responseStatus === 201) {
                                                                    isChangedSet(!isChanged);
                                                                }
                                                            })
                                                        }

                                                    }} className='btn btn-sm btn-warning' style={{ maxWidth: '100px', marginLeft: '12px' }}>Save</button>
                                                </label>
                                            </div>
                                        </div>


                                    </div> : null

                            );
                        })
                    }
                </div>
            </>
        );
    }

}
export default MarkPapersTeacher;









const handleDownload = (url, fileName) => {

    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch(error => {
            console.error('Error downloading file:', error);
        });
};
