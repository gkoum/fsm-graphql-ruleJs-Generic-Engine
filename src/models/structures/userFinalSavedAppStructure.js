// with the structure we can further validate each request because graphql is more generic for
// a request like an application or a judgment.
module.exports.userFinalSavedAppStructure = () => { return {
  id: 'ID',
  applicationType: 'String',
  degreeType: 'String',
  correspondence: 'Boolean',
  consideration: 'Boolean',
  recognitionWith: 'String',
  scoreMatch: 'String',
  userComment: 'String',
  appl_information: 'String',
  protocol: 'String',
  praxeisNo: 'String',
  attachedDocuments: [],
  personalDetails: {
    afm: 'String',
    name: 'String',
    surname: 'String',
    fatherName: 'String',
    motherName: 'String',
    dateOfBirth: 'Date',
    gender: 'String',
    address: 'String',
    postcode: 'String',
    area: 'String',
    city: 'String',
    countryId: 'ID',
    telephone: 'String',
    mobile: 'String',
    email: 'String',
    id: {
      idCardOrPassport: 'Boolean',
      number: 'String',
      issueAuthority: 'String',
      issueDate: 'String',
      expireDate: 'String'
    },
    birthCountryId: 'ID',
    birthCity: 'String'
  },
  titles: {
    distant: 'Boolean',
    partTime: 'Boolean',
    country: {
      id: 'ID',
      name: 'String',
      countryInserted: 'String'
    },
    partOfStudiesGr: 'String',
    cityOfStudiesGr: 'String',
    institutionOfStudiesGr: 'String',
    collegeOrFaculty: 'String',
    university: {
      id: 'ID',
      name: 'String',
      universityInserted: 'String'
    },
    college: {
      id: 'ID',
      name: 'String',
      collegeInserted: 'String'
    },
    faculty: {
      id: 'ID',
      name: 'String',
      facultyInserted: 'String'
    },
    department: {
      id: 'ID',
      name: 'String',
      departmentInserted: 'String'
    },
    dateOfGraduation: 'String',
    dateOfRegistration: 'String',
    certificationTitle: 'String',
    credits: 'String',
    durationOfStudies: 'String',
    studiesInMoreUniversities: 'Boolean',
    additionalUniversities: []
  },
  titleConsideration: {
    distant: 'Boolean',
    partTime: 'Boolean',
    country: {
      id: 'ID',
      name: 'String',
      countryInserted: 'String'
    },
    partOfStudiesGr: 'String',
    cityOfStudiesGr: 'String',
    institutionOfStudiesGr: 'String',
    collegeOrFaculty: 'String',
    university: {
      id: 'ID',
      name: 'String',
      universityInserted: 'String'
    },
    college: {
      id: 'ID',
      name: 'String',
      collegeInserted: 'String'
    },
    faculty: {
      id: 'ID',
      name: 'String',
      facultyInserted: 'String'
    },
    department: {
      id: 'ID',
      name: 'String',
      departmentInserted: 'String'
    }, dateOfGraduation: 'String',
    dateOfRegistration: 'String',
    certificationTitle: 'String',
    credits: 'String',
    durationOfStudies: 'String',
    studiesInMoreUniversities: 'Boolean',
    additionalUniversities: []
  },
  titlesCorrespondence: {
    universityDepartment: {
      name: 'String', id: 'ID'
    },
    TEIDepartment: {
      name: 'String',
      id: 'ID'
    }
  }
}
}
