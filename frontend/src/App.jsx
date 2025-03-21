import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import FileUpload from "./components/FileUpload";
import './App.css'

function App() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <FileUpload />
        </div>
    );
}

export default App
