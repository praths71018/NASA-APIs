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


