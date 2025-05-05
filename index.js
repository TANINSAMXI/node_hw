const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db('school');
        const students = db.collection('students');

        await students.deleteMany({});

        await students.insertMany([
            { name: 'Ivan', age: 21, group: 'A-31', marks: [75, 90, 82] },
            { name: 'Anna', age: 22, group: 'B-22', marks: [88, 92, 80] },
            { name: 'Oleg', age: 20, group: 'C-11', marks: [70, 60, 75] },
            { name: 'Andrii', age: 23, group: 'A-31', marks: [95, 85, 91] },
            { name: 'Diana', age: 19, group: 'B-22', marks: [78, 89, 84] }
        ]);

        console.log('All students:');
        console.log(await students.find().toArray());

        await students.updateOne({ name: 'Ivan' }, { $set: { age: 22 } });

        await students.deleteOne({ group: 'A-31' });

        console.log(' Students older than 20:');
        console.log(await students.find({ age: { $gt: 20 } }).toArray());

        console.log('Students with a mark > 85:');
        console.log(await students.find({ marks: { $elemMatch: { $gt: 85 } } }).toArray());

        console.log('Students whose name starts with "A":');
        console.log(await students.find({ name: { $regex: /^A/ } }).toArray());

        console.log('Students sorted by age (descending):');
        console.log(await students.find().sort({ age: -1 }).toArray());

        console.log('Average mark per student:');
        console.log(await students.aggregate([
            {
                $project: {
                    name: 1,
                    avgMark: { $avg: '$marks' }
                }
            }
        ]).toArray());

        console.log('Number of students per group:');
        console.log(await students.aggregate([
            {
                $group: {
                    _id: '$group',
                    count: { $sum: 1 }
                }
            }
        ]).toArray());

        console.log('Overall average mark (all students):');
        console.log(await students.aggregate([
            { $unwind: '$marks' },
            {
                $group: {
                    _id: null,
                    avgAll: { $avg: '$marks' }
                }
            }
        ]).toArray());

    } finally {
        await client.close();
    }
}

run().catch(console.error);
