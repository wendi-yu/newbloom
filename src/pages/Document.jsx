import '@/App.css'
import Header from "@/components/document/Header/Header"

function Document() {
  return (
    <div className='document h-full'>
      <Header documentName="Test Doc Title"/>
      <h1>Document Viewsss</h1>
    </div>
  );
}

export default Document;
