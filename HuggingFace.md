# HuggingFace





## Tokenizer

https://huggingface.co/docs/transformers/main_classes/tokenizer#transformers.PreTrainedTokenizer

A tokenizer is in charge of preparing the inputs for a model.

The `PreTrainedTokenizer` takes care of the tokenizer part, while the `PreTrainedTokenizerFast` is the faster library implemented in Rust with the `Tokenizers` library.



class `transformers.PreTrainedTokenizer`

Constructor variables:

- model_max_length: The maximum length (in number of tokens) for the inputs to the transformer model
- padding_side: The side to pad, takes ['right', 'left']

- truncation_side: The side to truncate, takes ['right', 'left']
- model_input_names
- bos_token: Special token for beginning of a sentence
- eos_token: ^^ end of sentence
- unk_token: Out-of-vocabulary token
- sep_token: Special token separating two different sentences
- pad_token: Special token for padding purpose, ignored by attention mechanisms & loss computation
- cls_token: Special token representingg input class
- mask_token: Special token representing a masked token (for masked-language modeling pretraining objectives)
- additional_special_tokens
- clean_up_tokenization_spaces



Attributes:

- max_model_input_sizes: mapping `short-cut-names` of pretrained models to integer of max # of tokens as input
- padding_side
- truncation_side
- ...



Methods:





