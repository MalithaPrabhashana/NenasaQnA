
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../components/css/MarkablePapers.css'
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Link } from '@material-ui/core';


const MarkablePapers = ({ selectedSubject, selectedTeacher }) => {

    const [papers, papersSet] = useState(null);
    const [isChanged, isChangedSet] = useState(false);

    useEffect(() => {
        axios.post('http://localhost:3000/paper-marking/papers',
            { teacherId: selectedTeacher, subject: selectedSubject.toLowerCase() },
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



    // useEffect(() => {
    //     console.log(papers);
    // }, [papers]);

    if (papers) {
        return (
            <>
                <div className='my-2 mainWrapper'>
                    {
                        papers.map((paper, index) => {

                            return (
                                <div className='row p-2 px-4  wrapperDiv' key={'paper_marking_' + index} >
                                    <div className="col col-12 col-md-3">{index + 1}.&nbsp;&nbsp; {paper.paperName}</div>
                                    <div className="col col-12 col-md-1">
                                        <Link  >
                                            <GetAppIcon onClick={() => handleDownload("http://localhost:3000/get-uploads/" + paper.link, paper.paperName)} style={{ cursor: 'pointer', marginLeft: '10px', marginRight: '10px' }} />
                                        </Link>

                                    </div>
                                    <div className="col col-12 col-md-6">
                                        <div className="row d-flex justify-content-start">
                                            {(paper.hasOwnProperty('userUpload')) ?
                                                <>

                                                    <label >


                                                        <input id="fileInput" type="file"

                                                            accept="pdf/*"
                                                            style={{ width: '70%' }} />
                                                        <button onClick={() => { HandlePdfUpload() }} className='btn btn-sm btn-warning' style={{ maxWidth: '100px', marginLeft: '12px' }}>Upload</button>

                                                        <label style={{ color: 'green', fontWeight: 'bold', fontSize: '18px', marginLeft: '15px' }} >
                                                            {((paper.userUpload == null) ? "" : "Marks " + paper.marks)}

                                                        </label>
                                                    </label>






                                                </>
                                                : <button onClick={() => {

                                                    axios.post('http://localhost:3000/paper-marking/make-open',
                                                        { teacherId: selectedTeacher, paperId: paper._id.toLowerCase() },
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


                                                }} className='btn btn-sm btn-success' style={{ maxWidth: '100px', marginLeft: '12px' }}>Buy</button>
                                            }


                                        </div>
                                    </div>
                                    <div className="col col-12 col-md-2"></div>

                                </div>

                            );
                        })
                    }
                </div>
            </>
        );
    }

}
export default MarkablePapers;








const HandlePdfUpload = () => {

    // const [createdPdf, setcreatedPdf] = useState('');

    const UploadPdffile = document.getElementById('fileInput').files[0];
    const uploadedPdf = new FormData();
    uploadedPdf.append('pdf', UploadPdffile);

    axios
        .post('http://localhost:3000/uploads/pdf', uploadedPdf, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then((response) => {
            // if (response.status === 200 | response.status === 201) {
            //     // setcreatedPdf(response.data['url']);
            //     console.log(response.data['url'])
            // }
        })
        .catch((error) => {
            console.error(error);
        });
};


const handleDownload = (url, fileName) => {
    console.log(fileName);
    console.log("url:1 "+url);
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
