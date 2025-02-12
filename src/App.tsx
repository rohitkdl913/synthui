import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadPage from './features/project_creation/page/upload_page';
import { ProjectProvider } from './features/provider/project_provider';
import EditorPage from './features/editor/page/editor';

const App = () => {
  return (
    <ProjectProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/editor" element={<EditorPage />} />
        </Routes>
      </Router>
    </ProjectProvider>
  );
};

export default App;
