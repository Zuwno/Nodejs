import axios from "axios";
import  express from "express";
const products = [
            { id: 1, Name: "Name 1" , Price: 123},
            { id: 2, Name: "Name 2" , Price: 321}
        ]

// // ES5
// const http = require("http");
// const server = http.createServer((req, res) =>
// {
//     
//     projects.push({Name: "Name3" , Price:"Price3"});
//     if(req.url == "/")
//     {
//         res.setHeader("Content-Type", "text/html")
//         res.end(`<html><body><div>Hello</div</body></html>`);
//     }
//     if(req.url == "/projects")
//     {
//         res.setHeader("Content-Type", "application/json")
//         res.end(JSON.stringify(projects));
//     }
// });
// server.listen(8080, () =>
// {
//     console.log("Server is running on port 8080");
// });


const app = express();

app.use(express.json())

//trả về list sản phẩm
app.get("/api/products", async (req, res) => {
    try {
        const { data } = await axios.get(`http://localhost:3002/products`);
    return res.json(data)
    } catch (error) {
        return res.status(400).json(
            {
                message: "Error",
            }
        )
    }
})

// trả về một sản phẩm
app.get("/api/products/:id", async (req, res)  => 
{
    try {
        const { data } = await axios.get(`http://localhost:3002/products/${req.params.id}`);
    return res.json(data)
    } catch (error) {
        return res.status(400).json(
            
            {
                message: "Error"
            }
        )
    }
})
// thêm sản phẩm
app.post("/api/products" , async (req, res) => 
{
    try {
        const {data} = await axios.post(`http://localhost:3002/products`, req.body);
    return res.json(
        {
            messsage: "Thêm thành công",
            data,
        }
    );
    } catch (error) {
        return res.status(400).json(
            {
                messsage: "Error",
                data,
            }
        );
    }
})

// xóa sản phẩm
app.delete("/api/products/:id", async (req, res) => 
{
    try {
        await axios.delete(`http://localhost:3002/products/${req.params.id}`)
        return res.json({
            message: "Xóa thành công",
        })
    } catch (error) {
        return res.status(400).json({
            message: "Error",
        })
    }
   
})

//cập nhật sản phẩm
app.patch("/api/products/:id", async  (req, res) => 
{
    try {
        const {data} = await axios.patch(`http://localhost:3002/products/${req.params.id}`, req.body);
     return res.json({
        message: "Cập nhật thành công",
       data
    })
    } catch (error) {
        return res.status(400).json({
            message: "Error",
           data
        })
    }
})

app.listen(8080, () => 
{
console.log("Server is running on port 8080");
});



