const configurations = [{
  name: 'Regular',
  configurations: [{
    a: '3⁶',
    b: '3/m60/r30(1e)',
  }, {
    a: '6³',
    b: '6/m30(1e)/r60',
  }, {
    a: '4⁴',
    b: '4/m45/r(1e)',
  }],
}, {
  name: 'Uniform',
  configurations: [{
    a: '3.12²',
    b: '12-3/m60/r30(1e)',
  }, {
    a: '3.4.6.4',
    b: '6-4-3/m60/r30(1c)',
  }, {
    a: '4.6.12',
    b: '12-6,4/m60/r30(1c)',
  }, {
    a: '(3.6)²',
    b: '6-3-6/m30/r30(2e)',
  }, {
    a: '4.8²',
    b: '8-4/m90/r45(1e)',
  }, {
    a: '3².4.3.4',
    b: '4-3-4,3/r90/r75(2e)',
  }, {
    a: '3³.4²',
    b: '4-4,3-0,3,3/m90/r75(2e)',
  }, {
    a: '3⁴.6',
    b: '6-3-3,3/r60/r41(2e)',
  }],
}, {
  name: '2 Uniform',
  configurations: [{
    a: '3⁶; 3².4.3.4',
    b: '3-4-3/m30/r30(1c)',
  }, {
    a: '3.4.6.4; 3².4.3.4',
    b: '6-4-3,3/m30/r(2e)',
  }, {
    a: '3.4.6.5; 3³.4²',
    b: '6-4-3-3/r60/r30(2e)',
  }, {
    a: '3.4.6.4; 3.4².6',
    b: '6-4-3,4-6/m30/r30(2c)',
  }, {
    a: '4.6.12; 3.4.6.4',
    b: '12-4,6-3/m30/r30(1c)',
  }, {
    a: '3⁶; 3².4.12',
    b: '12-3,4-3/m30/r30(1c)',
  }, {
    a: '3.12²; 3.4.3.12',
    b: '12-3-4/r90/r60(1e)',
  }, {
    a: '3⁶; 3².6²',
    b: '3-6/m60/r90(1c)',
  }, {
    a: '[3⁶; 3⁴.6]¹',
    b: '3-6,3/r120/m90(1e)',
  }, {
    a: '[3⁶; 3⁴.6]²',
    b: '6-3-3,3-3/r60/r45(3e)',
  }, {
    a: '3².6²; 3⁴.6',
    b: '6-3/m90/r19(2e)',
  }, {
    a: '3.6.3.6; 3².6²',
    b: '6-3,6/m90/r45(2e)',
  }, {
    a: '3.4².6; 3.6.3.6',
    b: '6-3,4/m90/r70(2e)',
  }, {
    a: '[3³.4²; 3².4.3.4]¹',
    b: '4-3,3-4,3/r90/m60(2c)',
  }, {
    a: '[3³.4²; 3².4.3.4]²',
    b: '4-3,3,3-4,3/r40(3e)/r270(1e)/r195(2e)',
  }, {
    a: '[4⁴; 3³.4²]¹',
    b: '4-4-3/m0(1e)/m90(1e)/r7(3e)',
  }, {
    a: '[4⁴; 3³.4²]²',
    b: '4-4-3-3/m90/r90(1e)/r7(3e)',
  }, {
    a: '[3⁶; 3³.4²]¹',
    b: '4-3,4-3,3/m90/r15(3e)',
  }, {
    a: '[3⁶; 3³.4²]²',
    b: '4-3-3-3/m90/r90(1e)/r25(4e)',
  }],
}, {
  name: '3-Uniform (2 Vertex Types)',
  configurations: [{
    a: '(3⁶)²; 3⁴.6',
    b: '6-3-3,3/m60/r30(2e)',
  }],
}, {
  name: '3-Uniform (3 Vertex Types)',
  configurations: [{
    a: '3.4².6; 3.6.3.6; 4.6.12',
    b: '12-6,4-3,3,4/m30/r30(2c)',
  }, {
    a: '3⁶; 3².4.12; 4.6.12',
    b: '12-3,4,6-3/m60/m90(1c)',
  }, {
    a: '3.4.3.12; 3.4.6.4; 3.12²',
    b: '6-4-3,3-12-0,0,0,3/m30/r60(2c)',
  }, {
    a: '3³.4²; 3².4.12; 3.4.6.4',
    b: '12-4,3-6,3-0,0,4/m30/m30(2c)',
  }, {
    a: '3⁶; 3³.4²; 3².4.12',
    b: '12-3,4-3-3-3/m30/m30(2e)',
  }, {
    a: '3⁶; 3².4.3.4; 3².4.12',
    b: '12-3,4-3,3/m30/r60(2e)',
  }, {
    a: '3⁴.6; 3³.4²; 3².4.3.4',
    b: '6-3-3-4-3,3/m30/m45(5e)',
  }, {
    a: '3⁶; 3³.4²; 3.4.6.4',
    b: '6-4-3,4-3,3/m30/m30(2c)',
  }, {
    a: '3⁶; 3².4.3.4; 3.4.6.4',
    b: '3-4-3,6-4/m30/r60(2c)',
  }, {
    a: '3⁶; 3³.4²; 3².4.3.4',
    b: '3-4-3-3/m30/r30(2e)',
  }, {
    a: '3².4.12; 3.4.3.12; 3.12²',
    b: '12-4-3,3/m90/r20(2e)',
  }, {
    a: '3.4.6.4; 3.4².6; 4⁴',
    b: '6-4,3-3,0,4-6/m90/r45(2e)',
  }, {
    a: '3².4.3.4; 3.4.6.4; 3.4².6',
    b: '6-4,3-3,3,4-0,0,6,3/m90/m(2e)/r60(2c)',
  }, {
    a: '3³.4²; 3².4.3.4; 4⁴',
    b: '4-3-3-0,4/r90/r20(3e)',
  }, {
    a: '3.4².6; 3.6.3.6; 4⁴',
    b: '6-4,3,3-4,4-4/m30(2c)/r/r120(1e)',
  }, {
    a: '3.4².6; 3.6.3.6; 4⁴',
    b: '6-4,3,3-4/m30(2e)/r/r120(1e)',
  }, {
    a: '3³.4²; 3².6²; 3.4².6',
    b: '4-6-3,0,3,3-0,0,4/r20(2e)/m90',
  }, {
    a: '3².6²; 3.4².6; 3.6.3.6',
    b: '4-6,4-0,3,3/r0(2e)/m90/m90(2c)',
  }, {
    a: '3⁴.6; 3³.4²; 3.4².6',
    b: '4-6,4-0,3,3-0,3,3/r/r(1c)/r90(2e)',
  }, {
    a: '3².6²; 3.6.3.6; 6³',
    b: '6-6-3,3,3/r60/m(2c)',
  }, {
    a: '3².6²; 3.6.3.6; 6³',
    b: '6-6,6,3-3,3/m/r35(3e)/r145(2e)',
  }, {
    a: '3⁴.6; 3².6²; 6³',
    b: '6-3-3/m/r135(1e)/r20(2e)',
  }, {
    a: '3⁶; 3².6²; 6³',
    b: '3-6/r60/m30(1c)',
  }, {
    a: '3⁶; 3⁴.6; 3².6²',
    b: '6-3-3,3-3,3-0,3/r90(1e)/r225(1e)/r30(3e)',
  }, {
    a: '6; 3⁴.6; 3².6²',
    b: '3-3,6-3/m/r35(2e)/r135(1c)',
  }, {
    a: '3⁶; 3⁴.6; 3².6²',
    b: '6-3-3/r15(3e)/m/r',
  }, {
    a: '3⁶; 3⁴.6; 3.6.3.6',
    b: '3-3,3-3,6,3/m90/r90(2e)/r(2e)',
  }, {
    a: '3⁶; 3⁴.6; 3.6.3.6',
    b: '3-3-6-0,3/r60/m60(2c)',
  }, {
    a: '3⁶; 3⁴.6; 3.6.3.6',
    b: '3-3-6/r60/r30(2e)',
  }, {
    a: '3⁶; 3³.4²; 4⁴',
    b: '4-4-3-3/m90/r(3e)/r90(1e)',
  }, {
    a: '3⁶; 3³.4²; 4⁴',
    b: '4-4-3-3-3/m90/r5(5e)/r90(1e)',
  }, {
    a: '3⁶; 3³.4²; 4⁴',
    b: '4-4-3-3-3/r0(1e)/r0(3e)/m90(1e)',
  }, {
    a: '3⁶; 3³.4²; 4⁴',
    b: '4-4-3-3-3/r0(1e)/r7(5e)/m90(1e)',
  }],
}, {
  name: '4-Uniform (3 Vertex Types)',
  configurations: [{
    a: '(3⁶)²; 3⁴.6; 3².6²',
    b: '6-3-3-3/r15(4e)/m/r',
  }],
}];

const find = (t, e) => {
  for (const group of configurations) {
    for (const configuration of group.configurations) {
      if (configuration[t] === e) {
        return configuration;
      }
    }
  }
};

export const findByA = (e) => find('a', e);
export const findByB = (e) => find('b', e);

export default configurations;
