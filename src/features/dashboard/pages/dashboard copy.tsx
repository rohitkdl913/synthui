import React from 'react';
import SideBar from '../components/sidebar';
import Header from '../components/header';
import { ProjectList } from '../components/projectlist';
import UploadNewVideo from '../components/upload_new_video';




const Dashboard: React.FC = () => {


    return (
        <div className="flex flex-col h-screen bg-gray-50 overflow-hidden ">
            <div className="flex flex-1 overflow-hidden">
                <SideBar></SideBar>
                <div className="flex-1">
                    <Header></Header>
                    <main className="p-6 pb-10  overflow-y-auto h-screen">
                        <UploadNewVideo></UploadNewVideo>
                        <ProjectList></ProjectList>

                    </main>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;