import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [rover, setRover] = useState('curiosity');
  const [sol, setSol] = useState('');
  const [earthDate, setEarthDate] = useState('');
  const [camera, setCamera] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState('');

  const fetchPhotos = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const params = {
        rover,
        camera,
        page
      };
      if (sol) params.sol = sol;
      if (earthDate) params.earth_date = earthDate;
      console.log('🔍 Sending request to backend with:', params);
      const res = await axios.get('http://localhost:8080/api/photos/search', { params });
      setPhotos(res.data.photos);
      setSource(res.data.source);
    } catch (err) {
      alert('Failed to fetch photos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mars Rover Photo Search</h1>

      <form onSubmit={fetchPhotos} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label>Rover</label>
          <select value={rover} onChange={(e) => setRover(e.target.value)} className="w-full p-2 border">
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
          </select>
        </div>

        <div>
          <label>Sol (Martian Day)</label>
          <input type="number" value={sol} onChange={(e) => setSol(e.target.value)} className="w-full p-2 border" />
        </div>

        <div>
          <label>Earth Date (YYYY-MM-DD)</label>
          <input type="date" value={earthDate} onChange={(e) => setEarthDate(e.target.value)} className="w-full p-2 border" />
        </div>

        <div>
          <label>Camera</label>
          <select value={camera} onChange={(e) => setCamera(e.target.value)} className="w-full p-2 border">
            <option value="">All</option>
            <option value="fhaz">FHAZ (Front Hazard)</option>
            <option value="rhaz">RHAZ (Rear Hazard)</option>
            <option value="mast">MAST</option>
            <option value="chemcam">CHEMCAM</option>
            <option value="mahli">MAHLI</option>
            <option value="mardi">MARDI</option>
            <option value="navcam">NAVCAM</option>
            <option value="pancam">PANCAM</option>
            <option value="minites">MINITES</option>
          </select>
        </div>

        <div>
          <label>Page</label>
          <input type="number" value={page} onChange={(e) => setPage(e.target.value)} className="w-full p-2 border" />
        </div>

        <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded">Search</button>
      </form>

      {loading && <p className="mt-4">Loading photos...</p>}
      {!loading && photos.length > 0 && (
        <>
          <p className="mt-4 text-green-600">Showing results from: <strong>{source}</strong></p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {photos.map(photo => (
              <img
                key={photo.photo_id}
                src={photo.img_src}
                alt={`Mars Rover - ${photo.camera}`}
                className="w-full h-48 object-cover border"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
