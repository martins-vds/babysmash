using Newtonsoft.Json;
using System.Net.Http;

namespace BabySmash.Services;

public class LocalizationService
{
    private readonly HttpClient _httpClient;
    private readonly Dictionary<string, Dictionary<string, string>> _strings = new();
    private string _currentLanguage = "en-EN";

    public LocalizationService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task LoadLanguage(string language)
    {
        if (_strings.ContainsKey(language))
        {
            _currentLanguage = language;
            return;
        }

        try
        {
            var json = await _httpClient.GetStringAsync($"Resources/Strings/{language}.json");
            var strings = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);
            
            if (strings != null)
            {
                _strings[language] = strings;
                _currentLanguage = language;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to load language {language}: {ex.Message}");
            // Fallback to English if available
            if (language != "en-EN" && _strings.ContainsKey("en-EN"))
            {
                _currentLanguage = "en-EN";
            }
        }
    }

    public string GetString(string key)
    {
        if (_strings.TryGetValue(_currentLanguage, out var languageStrings) &&
            languageStrings.TryGetValue(key, out var value))
        {
            return value;
        }

        // Fallback to English
        if (_currentLanguage != "en-EN" && 
            _strings.TryGetValue("en-EN", out var englishStrings) &&
            englishStrings.TryGetValue(key, out var englishValue))
        {
            return englishValue;
        }

        // Return key if not found
        return key;
    }

    public string CurrentLanguage => _currentLanguage;
    
    public async Task InitializeAsync()
    {
        await LoadLanguage("en-EN");
    }
}