import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './features/home/pages/home';
import LoginPage from './features/auth/pages/login';
import SignupPage from './features/auth/pages/signup';
import Dashboard from './features/dashboard/pages/dashboard';
import { ToastProvider } from './features/provider/toast_provider';
import { AuthProvider, ProtectedRoute } from './features/provider/auth_provider';
import { DialogProvider } from './features/provider/dialog_provider';
import SettingsLayout from './features/dashboard/pages/settings/settings_layout';
// import SubtitleSettings from './features/dashboard/pages/settings/subtitle_settings';
import SubtitleSettings from './features/dashboard/pages/settings/subtitle_settings';
import ApplicationSettings from './features/dashboard/pages/settings/application_settings';
import AccountSettings from './features/dashboard/pages/settings/account_settings';
import { ProjectProvider } from './features/provider/project_provider';
import Editor from './features/editor/page/editor';
import { SubtitleProvider } from './features/provider/subtitle_provider';
import ChangePassword from './features/dashboard/components/change_password';



function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ProjectProvider>

          <DialogProvider>
            <AuthProvider>

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />


                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/dashboard/settings" element={<SettingsLayout />}>
                  <Route index element={<SubtitleSettings />} />
                  <Route path="subtitle" element={<SubtitleSettings />} />
                  <Route path="application" element={<ApplicationSettings />} />
                  <Route path="account" element={<AccountSettings />} />
                  <Route path="account/change-password" element={<ChangePassword />} />
                </Route>


                <Route path="/editor/:id" element={
                  <SubtitleProvider>
                    <Editor />
                  </SubtitleProvider>

                } />

              </Routes>

            </AuthProvider>
          </DialogProvider>
        </ProjectProvider>
      </ToastProvider>
    </BrowserRouter >


  );

}

export default App
