var Threshold = 0
var Goal = 1
var neuronNumber = 0;
var Threshold = 0;
var neurons = [];
var Output = 0
var iterations = 0;

createNeuron(3)
Output = neuron(2,neuron(0,1,1),neuron(1,1,1))

console.log("Output: "+Output+" iterations: "+iterations)

function createNeuron(num) {
	for (var i = 0; i < num; i++) {
		neurons[neurons.length] = {
			"neuronId": neurons.length,
			"activation": 0.001,
			"rate": 0.001,
			"weight": 0.264
		}
	}
}

function neuron(neuronId,input1,input2) {
	iterations++;
//synapse:
	//determine rate
	neurons[neuronId].rate = Rate(neurons[neuronId].activation,Threshold,Goal,Output)
	//create new weight
	neurons[neuronId].weight = NewWeight(Output,Goal,neurons[neuronId].weight,neurons[neuronId].rate)
	
		//verify weight polarity
		//get weighted output
	var weightedOutput1 = input1*neurons[neuronId].weight
	var weightedOutput2 = input2*neurons[neuronId].weight 
	
//neuron:
	//accumulate synapse potential
	//if greater than threshold, activate.
	return output((weightedOutput1+weightedOutput2),Threshold)
}

function Rate(Activation,Threshold,Goal,Output,Sensitivity=0.003) {
	//If too close to the sensitivity, return 0, else return a weighted rate.
	if (Math.abs(Activation - Threshold) > Sensitivity) {
		return getRoundedNumber(Math.abs(Goal - Output)*Weight,3)
	} else {
		return 0
	};//end if 
};//end function

function NewWeight(Output,Goal,Weight,Rate) {
	if (Output < Goal) {
		return Weight + Rate
	} else if (Output > Goal) {
		return Weight - Rate
	} else {
		return 0;
	}
};//end function

function output(Potential,Threshold) {
	if (Potential > Threshold) {
		return Potential
	} else {
		return 0
	}
};//end function

