import fsPromises from 'fs/promises'

/*
CS5356 TODO 2a. Data Model

Fill in the methods below that will create,
read, update, and delete data.

All the data will be stored in ./db.json so you can view
what your data looks like locally.
*/

export const openDb = async () => {
  // CS5356 TODO 2a Set the initial structure of your dbObject here
  // @type {dbObject}
  let dbObject = {
    // Fill in collections
    classCodes: [
      // {
      // 'id': 'cs5356',
      // 'owner': 'user123'
    //  }
  ]
  }

  // Don't edit below this line.
  try {
    const text = await fsPromises.readFile('./db.json')
    return JSON.parse(text)
  } catch (err) {
    await saveData(dbObject)
    return dbObject
  }
}

export const getQuestions = async (classCode) => {
  const dbObject = await openDb()
  const classCodeObj = dbObject.classCodes.find(c => c.id === classCode);
  if (classCodeObj && classCodeObj.questions) {
    return classCodeObj.questions;
  }
  return [];
};

export const deleteClassCode = async (id) => {
  const dbObject = await openDb();
  const index = dbObject.classCodes.findIndex(classCode => classCode.id === id);
  if (index > -1) {
    dbObject.classCodes.splice(index, 1);
    await saveData(dbObject);
  } else {
    console.log('Class code does not exist');
  }
};

export const getClassCodes = async (username) => {
  const dbObject = await openDb()

  return dbObject.classCodes.filter(classCode => classCode.owner === username)
}

export const createQuestionForClassCode = async (classCode, question) => {
  const dbObject = await openDb()
  const classObj = dbObject.classCodes.find(c => c.id === classCode);

  if (!classObj) {
    console.log('Class code does not exist');
    return null;
  }

  classObj.questions = classObj.questions || [];

  const newQuestion = {
    question: question.question,
    name: question.name,
    id: Date.now().toString()
  };

  classObj.questions.push(newQuestion);
  await saveData(dbObject);

  return newQuestion;
};

export const createClassCode = async ({id, owner}) => {
  const dbObject = await openDb()
  const newClass = {
    id: id,
    owner: owner,
    createdAt: Date.now()
  }
  dbObject.classCodes.push(newClass)
  await saveData(dbObject);
  return newClass
};

export const deleteQuestion = async (id) => {
  const dbObject = await openDb();
  dbObject.classCodes.forEach(classCode => {
    if (classCode.questions) {
      const index = classCode.questions.findIndex(question => question.id === id);
      if (index > -1) {
        classCode.questions.splice(index, 1);
      }
    }
  });

  await saveData(dbObject);
};

// -------------------------------
// Do not edit the functions below
const saveData = async (dbObject) => {
  await fsPromises.writeFile('./db.json', JSON.stringify(dbObject))
}

export const clear = async () => {
  try {
    await fsPromises.rm('./db.json')
  } catch(err) {} // ignore error if file doesnt exist
};