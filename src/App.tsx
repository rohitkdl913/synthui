import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ProjectProvider } from './features/provider/project_provider';
import EditorPage from './features/editor/page/editor';
import ProjectList from './features/project_creation/page/project_page';
import { SubtitleProvider } from './features/provider/subtitle_provider';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/editor/:id" element={
          <ProjectProvider>
            <SubtitleProvider>
              <EditorPage />
            </SubtitleProvider>
          </ProjectProvider>
        } />
      </Routes>
    </Router>

  );
};

export default App;
