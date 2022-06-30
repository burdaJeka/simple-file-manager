import React, {useEffect, useState} from 'react';
import { Helmet } from 'react-helmet';


import './App.css';
function App() {
    const [parent, setParent] = useState('');
    const [data, setData] = useState({
        path: "",
        files: []
    });

    useEffect(() => {
        fetch("http://localhost:8080/")
            .then(res => res.json())
            .then(
                (result) => {
                    setParent('');
                    setData(result);
                },
                (error) => {
                }
            )
    }, []);

    const clickHandler = (event) => {
        event.preventDefault();
        console.log(event.target.attributes.href.value);
        fetch("http://localhost:8080/?path=" + event.target.attributes.href.value)
            .then(res => res.json())
            .then(
                (result) => {
                    let linkArr = result.path.split('/');
                    console.log(linkArr);
                    linkArr.pop();
                    setParent(linkArr.join('/'))
                    setData(result);
                },
                (error) => {
                }
            )
    };
    return (
        <div className="file-manager">
            <Helmet>
                <meta charSet="utf-8" />
                <title>myFirstFileManager</title>
            </Helmet>
            <ul className="folder-list">
                <div>
                    <a href={parent} onClick={clickHandler}>
                        <span className="material-icons">&#xe5d8;</span>
                        LEVEL UP
                    </a>
                </div>
                <div className="current-level">
                    current: {data.path === "" ? "/" : data.path}
                </div>
                {data.files.map(item => {
                    if (item.dir) {
                        return <li key={item.name} className="folder">
                            <a href={data.path + "/" + item.name} onClick={clickHandler}>
                                <span className="material-icons">&#xe2c7;</span>
                                {item.name.toUpperCase()}
                            </a>
                        </li>
                    } else {
                        return <li key={item.name} className="file">
                            <span className="material-icons">&#xe873;</span>
                            {item.name}
                        </li>
                    }
                })}
            </ul>
        </div>
    );
}

export default App;
