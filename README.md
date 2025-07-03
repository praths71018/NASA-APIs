## Creating a MongoDB database in cloud 

### 🌐 1. **Create a MongoDB Atlas Account**

* Go to: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
* Sign up (free tier is enough)

---

### ☁️ 2. **Create a Free Cluster**

* Choose the free **M0** shared cluster
* Select a cloud provider (AWS is default) and region close to your users
* Name your cluster (or leave default)

---

### 🧑‍💼 3. **Create a Database User**

* In the **Database Access** tab:

  * Click **"Add Database User"**
  * Choose a **username/password** (e.g. `mern_user` / `mern_pass123`)
  * Set role: **Read and write to any database**

✅ Save these credentials securely.

---

### 🔓 4. **Whitelist Your IP**

* In the **Network Access** tab:

  * Click **“Add IP Address”**
  * Choose **“Allow Access from Anywhere”** (`0.0.0.0/0`) for dev
  * (Use your IP only in prod for better security)

---

### 🔌 5. **Get the Connection URI**

* In **Database → Connect → Drivers → Node.js**, copy the connection string:

It will look like this:

```
mongodb+srv://mern_user:mern_pass123@cluster0.abcde.mongodb.net/mars-photos?retryWrites=true&w=majority
```

---

### ⚙️ 6. **Use in Your Backend**

#### 🔐 Set in `.env` (in your `/server` folder):

```env
MONGO_URI=mongodb+srv://mern_user:mern_pass123@cluster0.abcde.mongodb.net/mars-photos?retryWrites=true&w=majority
```

#### 🔌 In `server.js`:

```js
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('✅ Connected to MongoDB Atlas');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
});
```

---

### 🧪 7. **Test the App**

* Restart backend: `node server.js`
* Watch logs for:

  ```
  ✅ Connected to MongoDB Atlas
  ```

Your app now stores and retrieves data from **MongoDB in the cloud** 🎉

---

## Deploying on Render

Referred from : [How To Deploy Full Stack React App For Free | Deploy MERN Stack Project In 10 Minutes](https://www.youtube.com/watch?v=cVEOhgPziO8)

### 🔹 **1. Push your full repo to GitHub**

* Your frontend and backend should be in one repo like above.
* Make sure the root `.gitignore` includes `.env*`.

---

### 🔹 **2. Deploy Backend (Express) on Render**

1. Go to [https://render.com](https://render.com) and sign in

2. Click **“New → Web Service”**

3. Connect your GitHub repo

4. Choose the **`server/`** folder path in the repo

5. Set:

   * **Environment**: Node
   * **Build Command**: `npm install`
   * **Start Command**: `node server.js` *(or whatever runs your backend)*

6. Add environment variables:

   * `PORT` = `10000` or leave blank (Render auto assigns)
   * `MONGO_URI`, `SENTRY_DSN`, `NASA_API_KEY`, etc.

7. Click **Create Web Service**

👉 After deploy, note the backend URL:
`https://<your-backend-name>.onrender.com`

---

### 🔹 **3. Deploy Frontend (React) on Render**

1. Go back to [Render](https://render.com)

2. Click **“New → Static Site”**

3. Select the same repo but **set Root Directory = `client/`**

4. Set:

   * **Build Command**: `npm install; npm run build`
   * **Publish Directory**: `build`

5. Add this environment variable:

   ```
   REACT_APP_SERVER_URL=https://<your-backend-name>.onrender.com/api
   ```

6. Click **Create Static Site**

👉 You’ll get a frontend URL like:
`https://<your-webapp-name>.onrender.com`

7. In Server Cors , replace origin with frontend URL

    ```
    app.use(cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Use environment variable or default to localhost
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
    }));
    ```

---

### 🔐 Notes on `.env` and API URL

* In **React**, all env vars must start with `REACT_APP_`
* In your frontend, use:

  ```js
  axios.get(`${process.env.REACT_APP_SERVER_URL}/photos/search`)
  ```
* In Render’s settings, set correct values in **Environment → Add Environment Variable**

---

## 🧪 Test Deployment

1. Open the frontend Render URL
2. Test your search form — it should hit the backend hosted on Render

---
