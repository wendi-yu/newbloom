import spawn from "child_process"

const runRedaction = async (fileBody) => {
    return new Promise((resolve, reject) => {
        const modelRunner = spawn.spawn('python3', ['src/services/ml_model/ml_model_runner.py', fileBody]);
        let redactions = []
        // save python script output (list of redactions) into outer redactions variable
        modelRunner.stdout.on('data', (data) => {
            redactions = JSON.parse(data.toString())
        });
        // handle errors
        modelRunner.stderr.on('data', (data) => {
            console.log(data.toString())
            reject(Error(data.toString()))
        })
        // return once the stream closes
        modelRunner.stdout.on('end', () => {
            resolve(redactions)
        })
    })
}

export default runRedaction